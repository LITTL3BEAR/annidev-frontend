import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthLoading } from '../store';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
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
        <mat-card-title>Forgot Password</mat-card-title>
        <mat-card-content>
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              @if (forgotPasswordForm.get('email')?.hasError('required')) { <mat-error>Email is required</mat-error> }
              @if (forgotPasswordForm.get('email')?.hasError('email')) { <mat-error>Please enter a valid email address</mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="forgotPasswordForm.invalid">
              @if (loading()) { <mat-spinner diameter="20"></mat-spinner> }
              @else { Reset Password }
            </button>
          </form>
          <div class="links">
            <a routerLink="/auth/login">Remember your password? Login</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  forgotPasswordForm: FormGroup;
  loading = toSignal(this.store.select(selectAuthLoading));

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value
      this.store.dispatch(AuthActions.forgotPassword({ email }));
    }
  }
}