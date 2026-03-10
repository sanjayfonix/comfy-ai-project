import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
  secureStore,
  secureRetrieve,
  secureRemove,
  checkRateLimit,
  logSecurityEvent,
  generateSecureToken
} from '../utils/security';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bodyMeasurements?: {
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    bodyType: 'pear' | 'apple' | 'hourglass' | 'rectangle' | 'inverted-triangle';
  };
  preferences?: {
    style: string[];
    favoriteColors: string[];
    sizes: string[];
  };
  photoUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<UserProfile> & { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    // Load user from secure storage on mount
    try {
      const storedUser = secureRetrieve('comify_user');
      const storedToken = secureRetrieve('comify_session_token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setSessionToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading user session:', error);
      // Clear corrupted data
      secureRemove('comify_user');
      secureRemove('comify_session_token');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    
    // Validate email format
    if (!validateEmail(sanitizedEmail)) {
      logSecurityEvent('invalid_email_attempt', { email: sanitizedEmail });
      throw new Error('Invalid email format');
    }
    
    // Check rate limiting
    const rateLimit = checkRateLimit(`login_${sanitizedEmail}`, 5, 300000); // 5 attempts per 5 minutes
    if (!rateLimit.allowed) {
      logSecurityEvent('rate_limit_exceeded', { email: sanitizedEmail, resetTime: rateLimit.resetTime });
      const waitMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      throw new Error(`Too many login attempts. Please try again in ${waitMinutes} minutes.`);
    }
    
    // Simulate API call with added security delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    try {
      // Check if user exists in secure storage
      const usersData = secureRetrieve('comify_users');
      const users = usersData ? JSON.parse(usersData) : [];
      const foundUser = users.find((u: any) => u.email === sanitizedEmail && u.password === password);
      
      if (foundUser) {
        // Generate session token
        const sessionToken = generateSecureToken(64);
        
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setSessionToken(sessionToken);
        
        // Store securely
        secureStore('comify_user', JSON.stringify(userWithoutPassword));
        secureStore('comify_session_token', sessionToken);
        secureStore('comify_token', sessionToken); // Legacy support
        
        logSecurityEvent('login_success', { userId: userWithoutPassword.id, email: sanitizedEmail });
      } else {
        logSecurityEvent('login_failed', { email: sanitizedEmail });
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        throw error;
      }
      logSecurityEvent('login_error', { email: sanitizedEmail, error: String(error) });
      throw new Error('An error occurred during login. Please try again.');
    }
  };

  const signup = async (userData: Partial<UserProfile> & { email: string; password: string }) => {
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeInput(userData.email).toLowerCase();
    const sanitizedName = sanitizeInput(userData.name || '');
    
    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }
    
    // Check rate limiting for signup
    const rateLimit = checkRateLimit(`signup_${sanitizedEmail}`, 3, 3600000); // 3 attempts per hour
    if (!rateLimit.allowed) {
      logSecurityEvent('signup_rate_limit_exceeded', { email: sanitizedEmail });
      throw new Error('Too many signup attempts. Please try again later.');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const usersData = secureRetrieve('comify_users');
      const users = usersData ? JSON.parse(usersData) : [];
      
      // Check if email already exists
      if (users.some((u: any) => u.email === sanitizedEmail)) {
        logSecurityEvent('signup_duplicate_email', { email: sanitizedEmail });
        throw new Error('Email already exists');
      }
      
      const newUser: UserProfile = {
        id: `user_${Date.now()}_${generateSecureToken(8)}`,
        name: sanitizedName,
        email: sanitizedEmail,
        bodyMeasurements: userData.bodyMeasurements,
        preferences: userData.preferences,
        photoUrl: userData.photoUrl,
        createdAt: new Date().toISOString(),
      };
      
      // Generate session token
      const sessionToken = generateSecureToken(64);
      
      users.push({ ...newUser, password: userData.password });
      secureStore('comify_users', JSON.stringify(users));
      
      setUser(newUser);
      setSessionToken(sessionToken);
      secureStore('comify_user', JSON.stringify(newUser));
      secureStore('comify_session_token', sessionToken);
      secureStore('comify_token', sessionToken); // Legacy support
      
      logSecurityEvent('signup_success', { userId: newUser.id, email: sanitizedEmail });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      logSecurityEvent('signup_error', { email: sanitizedEmail, error: String(error) });
      throw new Error('An error occurred during signup. Please try again.');
    }
  };

  const logout = () => {
    if (user) {
      logSecurityEvent('logout', { userId: user.id });
    }
    
    setUser(null);
    setSessionToken(null);
    
    // Clear all auth-related secure storage
    secureRemove('comify_user');
    secureRemove('comify_session_token');
    secureRemove('comify_token');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      // Sanitize text inputs
      const sanitizedUpdates: Partial<UserProfile> = { ...updates };
      
      if (updates.name) {
        sanitizedUpdates.name = sanitizeInput(updates.name);
      }
      
      if (updates.email) {
        const sanitizedEmail = sanitizeInput(updates.email).toLowerCase();
        if (!validateEmail(sanitizedEmail)) {
          throw new Error('Invalid email format');
        }
        sanitizedUpdates.email = sanitizedEmail;
      }
      
      const updatedUser = { ...user, ...sanitizedUpdates };
      setUser(updatedUser);
      secureStore('comify_user', JSON.stringify(updatedUser));
      
      // Update in users array
      try {
        const usersData = secureRetrieve('comify_users');
        const users = usersData ? JSON.parse(usersData) : [];
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...sanitizedUpdates };
          secureStore('comify_users', JSON.stringify(users));
        }
        
        logSecurityEvent('profile_updated', { userId: user.id });
      } catch (error) {
        console.error('Error updating profile:', error);
        logSecurityEvent('profile_update_error', { userId: user.id, error: String(error) });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !!sessionToken,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};