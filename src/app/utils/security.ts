/**
 * Security utilities for Comify AI platform
 * Implements XSS protection, input sanitization, and secure token management
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The string to sanitize
 * @returns Sanitized string safe for rendering
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Create a map of HTML entities
  const entityMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return input.replace(/[&<>"'`=\/]/g, (char) => entityMap[char]);
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Password must be at least 8 characters with uppercase, lowercase, number, and special char
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }

  return { valid: true, message: 'Password is strong' };
}

/**
 * Securely stores data in localStorage with encryption simulation
 * @param key - Storage key
 * @param value - Value to store
 */
export function secureStore(key: string, value: string): void {
  try {
    // In production, implement actual encryption here
    // For now, we'll use base64 encoding as a basic obfuscation
    const encoded = btoa(value);
    localStorage.setItem(key, encoded);
  } catch (error) {
    console.error('Error storing secure data:', error);
  }
}

/**
 * Securely retrieves data from localStorage with decryption simulation
 * @param key - Storage key
 * @returns Decrypted value or null
 */
export function secureRetrieve(key: string): string | null {
  try {
    const encoded = localStorage.getItem(key);
    if (!encoded) return null;

    // Decode the base64 encoded value
    return atob(encoded);
  } catch (error) {
    console.error('Error retrieving secure data:', error);
    return null;
  }
}

/**
 * Securely removes data from localStorage
 * @param key - Storage key
 */
export function secureRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing secure data:', error);
  }
}

/**
 * Validates JWT token format (basic check)
 * @param token - JWT token to validate
 * @returns Boolean indicating if token format is valid
 */
export function validateToken(token: string): boolean {
  if (!token) return false;

  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    // Try to decode the payload to ensure it's valid base64
    atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return true;
  } catch {
    return false;
  }
}

/**
 * Rate limiting utility using localStorage
 * @param key - Unique identifier for the action
 * @param maxAttempts - Maximum attempts allowed
 * @param timeWindow - Time window in milliseconds
 * @returns Boolean indicating if action is allowed
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  timeWindow: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const rateLimitKey = `rate_limit_${key}`;
  const now = Date.now();

  try {
    const stored = localStorage.getItem(rateLimitKey);
    let attempts: { timestamp: number }[] = stored ? JSON.parse(stored) : [];

    // Remove old attempts outside the time window
    attempts = attempts.filter(attempt => now - attempt.timestamp < timeWindow);

    if (attempts.length >= maxAttempts) {
      const oldestAttempt = attempts[0].timestamp;
      const resetTime = oldestAttempt + timeWindow;

      return {
        allowed: false,
        remaining: 0,
        resetTime: resetTime
      };
    }

    // Add new attempt
    attempts.push({ timestamp: now });
    localStorage.setItem(rateLimitKey, JSON.stringify(attempts));

    return {
      allowed: true,
      remaining: maxAttempts - attempts.length,
      resetTime: now + timeWindow
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the action but log it
    return { allowed: true, remaining: maxAttempts, resetTime: now + timeWindow };
  }
}

/**
 * Clears rate limit for a specific key
 * @param key - Rate limit key to clear
 */
export function clearRateLimit(key: string): void {
  const rateLimitKey = `rate_limit_${key}`;
  localStorage.removeItem(rateLimitKey);
}

/**
 * Sanitizes URL to prevent open redirect vulnerabilities
 * @param url - URL to sanitize
 * @param allowedDomains - List of allowed domains
 * @returns Sanitized URL or default safe URL
 */
export function sanitizeRedirectUrl(url: string, allowedDomains: string[] = ['comify.ai']): string {
  try {
    // If it's a relative URL, it's safe
    if (url.startsWith('/')) {
      return url;
    }

    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Check if the domain is in the allowed list
    const isAllowed = allowedDomains.some(domain =>
      hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (isAllowed) {
      return url;
    }

    // If not allowed, return a safe default
    return '/dashboard';
  } catch {
    // If URL parsing fails, return safe default
    return '/dashboard';
  }
}

/**
 * Generates a secure random string for CSRF tokens
 * @param length - Length of the random string
 * @returns Random string
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Content Security Policy headers helper
 * Returns CSP directives for secure content loading
 */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'", 'https://*.supabase.co'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

/**
 * Validates file upload to prevent malicious files
 * @param file - File object to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSize - Maximum file size in bytes (default 5MB)
 * @returns Validation result
 */
export function validateFileUpload(
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize: number = 5 * 1024 * 1024
): { valid: boolean; message: string } {
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      message: `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB limit`
    };
  }

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = allowedTypes.map(type => type.split('/')[1]);

  if (!extension || !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      message: 'File extension does not match its type'
    };
  }

  return { valid: true, message: 'File is valid' };
}

/**
 * Logs security events for monitoring
 * @param event - Security event type
 * @param details - Event details
 */
export function logSecurityEvent(event: string, details: Record<string, unknown>): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // In production, send this to a security monitoring service
  if (import.meta.env.DEV) {
    console.debug('[SECURITY EVENT]', logEntry);
  } else {
    console.warn('[SECURITY EVENT]', logEntry);
  }

  // Store critical security events locally for audit
  try {
    const key = 'security_log';
    const stored = localStorage.getItem(key);
    const logs = stored ? JSON.parse(stored) : [];

    // Keep only last 100 events
    logs.push(logEntry);
    if (logs.length > 100) {
      logs.shift();
    }

    localStorage.setItem(key, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}
