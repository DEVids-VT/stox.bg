'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  // Always start with defaultTheme on server and first mount
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // This effect is only run on the client, after hydration
  useEffect(() => {
    // Get theme from localStorage after component mounts on the client
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  // Apply theme changes
  useEffect(() => {
    // This effect only runs on the client
    if (typeof window === 'undefined') return;
    
    const applyTheme = (newTheme: Theme) => {
      const root = window.document.documentElement;
      
      // First remove both classes
      root.classList.remove('light', 'dark');
      
      // If theme is system, check OS preference
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        // Otherwise add the selected theme
        root.classList.add(newTheme);
      }
    };
    
    applyTheme(theme);
  }, [theme]);

  // Set up a listener for system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // If the theme is system, we need to update when OS preference changes
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Set theme function that updates cookies, localStorage and applies the theme
  const setThemeValue = (newTheme: Theme) => {
    // Save to cookie
    Cookies.set(storageKey, newTheme, { expires: 365 });
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
      
      // Apply theme
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    }
    
    // Update state
    setTheme(newTheme);
  };

  // Value for the context
  const value = {
    theme,
    setTheme: setThemeValue,
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 