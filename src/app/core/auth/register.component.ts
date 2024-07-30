import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" required>
        @if (registerForm.get('username')?.hasError('required')) { <mat-error>Username is required</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" required>
        @if (registerForm.get('email')?.hasError('required')) { <mat-error>Email is required</mat-error> }
        @if (registerForm.get('email')?.hasError('email')) { <mat-error>Please enter a valid email address</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" required>
        @if (registerForm.get('password')?.hasError('required')) { <mat-error>Password is required</mat-error> }
        @if (registerForm.get('password')?.hasError('minlength')) { <mat-error>Password must be at least 6 characters long</mat-error> }
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 300px;
      margin: 0 auto;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }

    button {
      width: 100%;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(register(this.registerForm.value));
    }
  }
}