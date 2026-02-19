/* ============================================
   app.js - Theme toggle, smooth scroll, form init
   ============================================ */

import { getTheme, setTheme, initTheme } from './storage.js';
import { initForm } from './form.js';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

// Apply theme on load
initTheme();

// Theme toggle button
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.textContent = theme === THEME_DARK ? '☀' : '🌙';
  }
}

if (themeToggle) {
  updateThemeIcon(getTheme());
  themeToggle.addEventListener('click', () => {
    const current = getTheme();
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(next);
    updateThemeIcon(next);
    themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
  });
}

// Mobile menu toggle
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.navbar__menu-btn');
if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('navbar--open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  // Close menu when clicking a nav link (e.g. after smooth scroll on small screens)
  navbar.querySelectorAll('.navbar__links a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('navbar--open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form validation
initForm();
