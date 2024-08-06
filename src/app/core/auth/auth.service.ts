import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);
  private authEndpoint = 'auth';
  private readonly TOKEN_KEY = 'token';

  login(username: string, password: string): Observable<any> {
    return this.apiService.post(`${this.authEndpoint}/login`, { username, password })
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.apiService.post(`${this.authEndpoint}/register`, { username, email, password })
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(`${this.authEndpoint}/forgot-password`, { email })
  }

  logout(): void {
    this.removeToken();
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}