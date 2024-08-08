import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthLoading } from '../store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
    <div class="vertical-container">
      <mat-card>
        <mat-card-title>Register</mat-card-title>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required>
              @if (registerForm.get('username')?.hasError('required')) { <mat-error>Username is required</mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              @if (registerForm.get('email')?.hasError('required')) { <mat-error>Email is required</mat-error> }
              @if (registerForm.get('email')?.hasError('email')) { <mat-error>Please enter a valid email address</mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              @if (registerForm.get('password')?.hasError('required')) { <mat-error>Password is required</mat-error> }
              @if (registerForm.get('password')?.hasError('minlength')) { <mat-error>Password must be at least 6 characters long</mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput type="password" formControlName="confirmPassword" required>
              @if (registerForm.get('confirmPassword')?.hasError('required')) { <mat-error>Confirm Password is required</mat-error> }
              @if (registerForm.get('confirmPassword')?.hasError('passwordMismatch')) { <mat-error>Passwords do not match</mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
              @if (loading()) { <mat-spinner diameter="20"></mat-spinner> }
              @else { Register }
            </button>
          </form>
          <div class="links">
            <a routerLink="/auth/login">Already have an account? Login</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  registerForm: FormGroup;
  loading = toSignal(this.store.select(selectAuthLoading));

  constructor() {
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
      this.store.dispatch(AuthActions.register({ username, email, password }));
    }
  }
}