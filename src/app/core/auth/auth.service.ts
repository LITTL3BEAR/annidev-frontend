import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { } from '../../store/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private authEndpoint = 'auth';

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
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}