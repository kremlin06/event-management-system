import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { createTheme } from '../styles/theme';

// Storage key
// Keep this in one place so the flash-prevention script in index.html
// and the ThemeProvider always stay in sync.
export const THEME_STORAGE_KEY = 'theme-preference';

/**
 * Read the initial theme mode from:
 *   1. localStorage (user's saved preference — highest priority)
 *   2. OS/browser preference via prefers-color-scheme media query
 *   3. Hard-coded fallback: 'dark'
 *
 * Called once during useState initialisation — runs before first render.
 */
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'; // SSR guard

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  // System preference fallback
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';

  return 'dark';
};

/**
 * ThemeProvider
 *
 * Manages the active theme mode ('light' | 'dark'), persists it to
 * localStorage, and keeps the <html data-theme="…"> attribute in sync
 * so CSS variables (if any) and the flash-prevention script both work.
 *
 * Provides to all consumers via useTheme():
 *   { theme, themeMode, isDark, toggleTheme }
 *
 * Separation note: ThemeContext is in a separate file so React Fast
 * Refresh can update this provider without losing HMR on the context
 * object itself (mixing context + non-component exports triggers a
 * full-page reload under Fast Refresh).
 */
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  // Persist to localStorage and sync the data-theme attribute on every change.
  // The attribute lets plain CSS (outside styled-components) target the current theme.
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme  = createTheme(themeMode);
  const isDark = themeMode === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, themeMode, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
