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
      <mat-card>
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

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
          </form>
          <div class="additional-links">
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
      background-color: var(--background-light);
    }
    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      background-color: var(--background-default);
    }
    mat-card-title {
      text-align: center;
      color: var(--primary-color);
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    mat-form-field {
      margin-bottom: 15px;
    }
    button {
      margin-top: 10px;
    }
    .additional-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    .additional-links a {
      color: var(--primary-color);
      text-decoration: none;
      margin-top: 10px;
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