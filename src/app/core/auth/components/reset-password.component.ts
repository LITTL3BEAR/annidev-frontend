import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthLoading } from '../store';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-reset-newPassword',
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
        <mat-card-title>Reset Password</mat-card-title>
        <mat-card-content>
          <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>New Password</mat-label>
              <input matInput type="newPassword" formControlName="newPassword" required>
              @if (resetPasswordForm.get('newPassword')?.hasError('required')) { <mat-error>Password is required</mat-error> }
              @if (resetPasswordForm.get('newPassword')?.hasError('minlength')) { <mat-error>Password must be at least 6 characters long</mat-error> }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput type="newPassword" formControlName="confirmPassword" required>
              @if (resetPasswordForm.get('confirmPassword')?.hasError('required')) { <mat-error>Confirm Password is required</mat-error> }
              @if (resetPasswordForm.get('confirmPassword')?.hasError('passwordMismatch')) { <mat-error>Passwords do not match</mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="resetPasswordForm.invalid">
              @if (loading()) { <mat-spinner diameter="20"></mat-spinner> }
              @else { Set New Password }
            </button>
          </form>
          <div class="links">
            <a routerLink="/auth/login">Back to Login</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);

  resetPasswordForm: FormGroup;
  loading = toSignal(this.store.select(selectAuthLoading));
  private token: string | null = null;

  constructor() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.snackBar.error('Invalid or missing reset token');
        this.router.navigate(['/auth/forgot-password']);
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const { newPassword } = this.resetPasswordForm.value;
      this.store.dispatch(AuthActions.resetPassword({ newPassword, token: this.token }));
    }
  }
}