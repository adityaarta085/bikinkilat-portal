'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookieDomain } from './session';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_COOKIE_NAME = 'bikinkilat_theme';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';

  // 1. Check cross-subdomain cookie
  const match = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + THEME_COOKIE_NAME + '=([^;]*)')
  );
  if (match && (match[1] === 'dark' || match[1] === 'light')) {
    return match[1] as Theme;
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem(THEME_COOKIE_NAME);
    if (saved === 'dark' || saved === 'light') return saved as Theme;
  } catch (e) {}

  // 3. System preference
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function saveThemeToStorage(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const domain = getCookieDomain();
  const domainStr = domain ? `; Domain=${domain}` : '';
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureStr = isSecure ? '; Secure' : '';
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=${maxAge}; SameSite=Lax${domainStr}${secureStr}`;
  try {
    localStorage.setItem(THEME_COOKIE_NAME, theme);
  } catch (e) {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    saveThemeToStorage(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
