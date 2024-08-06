import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private static readonly THEME_KEY = 'theme';
  private static readonly DARK_THEME_CLASS = 'dark-theme';

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly isDarkTheme = signal(this.loadInitialTheme());

  isDarkTheme$ = this.isDarkTheme.asReadonly();

  toggleDarkTheme(): void {
    this.setTheme(!this.isDarkTheme());
  }

  private loadInitialTheme(): boolean {
    if (!this.isBrowser) return false;
    return localStorage.getItem(ThemeService.THEME_KEY) === 'dark';
  }

  private setTheme(isDark: boolean): void {
    this.isDarkTheme.set(isDark);
    if (this.isBrowser) {
      localStorage.setItem(ThemeService.THEME_KEY, isDark ? 'dark' : 'light');
      document.body.classList.toggle(ThemeService.DARK_THEME_CLASS, isDark);
    }
  }
}