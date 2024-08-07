import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private readonly AUTH_ENDPOINT = 'auth';
  private readonly TOKEN_KEY = 'token';

  login(username: string, password: string): Observable<any> {
    return this.apiService.post(`${this.AUTH_ENDPOINT}/login`, { username, password })
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.apiService.post(`${this.AUTH_ENDPOINT}/register`, { username, email, password })
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(`${this.AUTH_ENDPOINT}/forgot-password`, { email })
  }

  logout(): void {
    this.removeToken();
  }

  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    this.storageService.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}