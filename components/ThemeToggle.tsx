'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('chem-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chem-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chem-theme', 'dark');
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="테마 전환"
      className="relative p-2.5 rounded-full transition-all duration-300 neu-button flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 group"
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform group-hover:rotate-45 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12 text-indigo-600" />
      )}
    </button>
  );
}
