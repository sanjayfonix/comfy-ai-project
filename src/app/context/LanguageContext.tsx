import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('comify-language');
    
    // DACH region (Germany, Austria, Switzerland) first priority
    // If no saved preference exists, default to German (de)
    // Only use saved preference if it's explicitly 'de' or 'en'
    if (saved === 'en' || saved === 'de') {
      return saved;
    }
    
    // Default to German for DACH region focus
    return 'de';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('comify-language', language);
    
    // Update HTML lang attribute for SEO
    document.documentElement.lang = language === 'de' ? 'de-DE' : 'en-US';
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}