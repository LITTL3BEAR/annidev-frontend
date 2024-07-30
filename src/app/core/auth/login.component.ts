import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-title>Login</mat-card-title>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid" class="login-button">Login</button>
          </form>
          <div class="login-links">
            <a routerLink="/auth/forgot-password">Forgot Password?</a>
            <a routerLink="/auth/register">Don't have an account? Sign up</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: var(--background-color);
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 24px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      transition: box-shadow 0.3s ease;
    }
    .login-card:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    mat-card-title {
      text-align: center;
      color: var(--primary-color);
      margin-bottom: 20px;
      font-size: 24px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    mat-form-field {
      margin-bottom: 15px;
    }
    .login-button {
      margin-top: 10px;
      background-color: var(--primary-color);
      color: white;
      padding: 12px;
      border-radius: 4px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .login-button:not([disabled]):hover {
      background-color: var(--primary-color);
      opacity: 0.9;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    .login-button:not([disabled]):active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .login-button[disabled] {
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
      box-shadow: none;
    }
    .login-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    .login-links a {
      color: var(--primary-color);
      text-decoration: none;
      margin-top: 10px;
      transition: all 0.3s ease;
      position: relative;
    }
    .login-links a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: var(--primary-color);
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s ease;
    }
    .login-links a:hover {
      color: var(--accent-color);
    }
    .login-links a:hover::after {
      visibility: visible;
      transform: scaleX(1);
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value));
    }
  }
}