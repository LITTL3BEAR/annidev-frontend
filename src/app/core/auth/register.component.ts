import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-title>Register</mat-card-title>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required>
              @if (registerForm.get('username')?.hasError('required')) { <mat-error> Username is required </mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              @if (registerForm.get('email')?.hasError('required')) { <mat-error> Email is required </mat-error> }
              @if (registerForm.get('email')?.hasError('email')) { <mat-error> Please enter a valid email address </mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              @if (registerForm.get('password')?.hasError('required')) { <mat-error> Password is required </mat-error> }
              @if (registerForm.get('password')?.hasError('minlength')) { <mat-error> Password must be at least 6 characters long </mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput type="password" formControlName="confirmPassword" required>
              @if (registerForm.get('confirmPassword')?.hasError('required')) { <mat-error> Confirm Password is required </mat-error> }
              @if (registerForm.get('confirmPassword')?.hasError('passwordMismatch')) { <mat-error> Passwords do not match </mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid" class="register-button">Register</button>
          </form>
          <div class="register-links">
            <a routerLink="/auth/login">Already have an account? Login</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: var(--background-color);
    }
    .register-card {
      width: 100%;
      max-width: 400px;
      padding: 24px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      transition: box-shadow 0.3s ease;
    }
    .register-card:hover {
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
    .register-button {
      margin-top: 10px;
      background-color: var(--primary-color);
      color: white;
      padding: 12px;
      border-radius: 4px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .register-button:not([disabled]):hover {
      background-color: var(--primary-color);
      opacity: 0.9;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    .register-button:not([disabled]):active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .register-button[disabled] {
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
      box-shadow: none;
    }
    .register-links {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .register-links a {
      color: var(--primary-color);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }
    .register-links a::after {
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
    .register-links a:hover {
      color: var(--accent-color);
    }
    .register-links a:hover::after {
      visibility: visible;
      transform: scaleX(1);
    }
    mat-error {
      font-size: 12px;
      margin-top: 4px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.store.dispatch(register({ username, email, password }));
    }
  }
}