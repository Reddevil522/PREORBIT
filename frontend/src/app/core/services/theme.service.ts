// ============================================================
// PREORBIT — Theme Service  (Prompt 9 — polished)
// ============================================================
// Manages Light / Dark mode across the entire application.
//
// Implementation:
//   - Signal-based reactive state
//   - Writes data-theme to <html> element
//   - Updates <meta name="theme-color"> for browser chrome
//   - Persists in localStorage under 'preorbit_theme'
//   - Reads OS preference as fallback
//   - FOUC prevented by inline script in index.html
// ============================================================

import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_KEY          = 'preorbit_theme';
const THEME_COLOR_DARK   = '#0b0d14';
const THEME_COLOR_LIGHT  = '#f3f5f8';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  // ── Reactive state ─────────────────────────────────────────
  private readonly _theme = signal<Theme>(this.resolveInitialTheme());

  readonly currentTheme = this._theme.asReadonly();
  readonly isDark  = () => this._theme() === 'dark';
  readonly isLight = () => this._theme() === 'light';

  constructor() {
    // Apply theme whenever signal changes
    effect(() => {
      this.applyTheme(this._theme());
    });
  }

  // ── Toggle ─────────────────────────────────────────────────
  toggleTheme(): void {
    this._theme.update(t => t === 'dark' ? 'light' : 'dark');
    localStorage.setItem(THEME_KEY, this._theme());
  }

  // ── Set explicitly ─────────────────────────────────────────
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // ── Private: apply theme to DOM ────────────────────────────
  private applyTheme(theme: Theme): void {
    // 1. data-theme attribute drives CSS variable overrides
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Browser chrome theme-color
    const meta = document.getElementById('meta-theme-color') as HTMLMetaElement | null;
    if (meta) {
      meta.content = theme === 'light' ? THEME_COLOR_LIGHT : THEME_COLOR_DARK;
    }
  }

  // ── Private: resolve initial theme ─────────────────────────
  private resolveInitialTheme(): Theme {
    try {
      // 1. Saved user preference
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;

      // 2. OS preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // localStorage unavailable (e.g. private browsing restriction)
    }

    // 3. Default: dark
    return 'dark';
  }
}
