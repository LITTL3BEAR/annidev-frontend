import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

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
    <div class="vertical-container">
      <mat-card>
        <mat-card-title>Login</mat-card-title>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required>
              @if (loginForm.get('username')?.hasError('required')) { <mat-error>Username is required</mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              @if (loginForm.get('password')?.hasError('required')) { <mat-error>Password is required</mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
          </form>
          <div class="links">
            <a routerLink="/auth/forgot-password">Forgot Password?</a>
            <a routerLink="/auth/register">Don't have an account? Sign up</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.store.dispatch(login({ username, password }));
    }
  }
}