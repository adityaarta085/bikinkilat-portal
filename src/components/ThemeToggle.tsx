'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Mode Terang (Light Mode)' : 'Mode Gelap (Dark Mode)'}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
        isDark
          ? 'bg-slate-900/90 text-amber-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.5)]'
          : 'bg-white/90 text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
      } ${className}`}
    >
      <div className="relative w-4 h-4">
        <Sun
          className={`w-4 h-4 absolute inset-0 transition-all duration-300 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
        />
        <Moon
          className={`w-4 h-4 absolute inset-0 transition-all duration-300 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100 text-sky-300 fill-sky-300/20' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}

export default ThemeToggle;
