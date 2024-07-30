import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <button mat-raised-button color="primary" routerLink="/">Go to Home</button>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    h1 {
      font-size: 6rem;
      margin-bottom: 0;
      color: #f44336;
    }
    h2 {
      font-size: 2rem;
      margin-top: 0;
    }
    p {
      margin-bottom: 2rem;
    }
  `]
})
export class NotFoundComponent { }