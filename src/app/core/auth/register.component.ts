import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput [(ngModel)]="username" name="username" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="email" [(ngModel)]="email" name="email" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" [(ngModel)]="password" name="password" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Register</button>
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
  `]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    // Implement registration logic here
    console.log('Registration attempt', this.username, this.email, this.password);
  }
}