import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
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
        <mat-card-title>Forgot Password</mat-card-title>
        <mat-card-content>
          <form [formGroup]="forgetPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              @if (forgetPasswordForm.get('email')?.hasError('required')) { <mat-error> Email is required </mat-error> }
              @if (forgetPasswordForm.get('email')?.hasError('email')) { <mat-error> Please enter a valid email address </mat-error> }
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="forgetPasswordForm.invalid">Reset Password</button>
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
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const { email } = this.forgetPasswordForm.value;
      console.log({ email });
      // TODO: Dispatch forget password action
      // this.store.dispatch(forgetPassword({ email }));
    }
  }
}