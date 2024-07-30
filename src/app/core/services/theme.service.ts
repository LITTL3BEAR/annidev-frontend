import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private static readonly THEME_KEY = 'theme';
  private static readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly isDarkTheme = new BehaviorSubject<boolean>(false);
  private readonly renderer: Renderer2;
  private readonly isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadTheme();
  }

  toggleDarkTheme(): void {
    this.setTheme(!this.isDarkTheme.value);
  }

  isDarkTheme$(): Observable<boolean> {
    return this.isDarkTheme.asObservable();
  }

  private loadTheme(): void {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem(ThemeService.THEME_KEY);
      this.setTheme(savedTheme === 'dark');
    } else {
      // Default to light theme on server
      this.setTheme(false);
    }
  }

  private setTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    if (this.isBrowser) {
      localStorage.setItem(ThemeService.THEME_KEY, isDark ? 'dark' : 'light');
      this.updateBodyClass(isDark);
    }
  }

  private updateBodyClass(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(document.body, ThemeService.DARK_THEME_CLASS);
    } else {
      this.renderer.removeClass(document.body, ThemeService.DARK_THEME_CLASS);
    }
  }
}