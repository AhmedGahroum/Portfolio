/* ============================================
   storage.js - Theme persistence via localStorage
   ============================================ */

const THEME_KEY = 'portfolio-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

/**
 * Get stored theme from localStorage.
 * @returns {'dark'|'light'} Theme value
 */
export function getTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === THEME_DARK || stored === THEME_LIGHT) return stored;
  // Prefer dark if system prefers it
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME_DARK;
  }
  return THEME_LIGHT;
}

/**
 * Save theme to localStorage and apply to document.
 * @param {'dark'|'light'} theme
 */
export function setTheme(theme) {
  if (theme !== THEME_DARK && theme !== THEME_LIGHT) return;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Initialize theme on load (apply stored or system preference).
 */
export function initTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
}
