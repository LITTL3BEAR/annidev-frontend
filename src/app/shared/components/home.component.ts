import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h1 class="title">Welcome to ANNIDEV</h1>
      <p class="subtitle">Explore our features</p>
      <div class="button-group">
        <mat-card class="feature-card" [routerLink]="['/manga']">
          <mat-card-content>
            <mat-icon>menu_book</mat-icon>
            <h2>Manga</h2>
            <p>Discover and track your favorite manga</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="feature-card" [routerLink]="['/minimood']">
          <mat-card-content>
            <mat-icon>store</mat-icon>
            <h2>MiniMood</h2>
            <p>Manage your store with ease</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .title {
      color: var(--primary);
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .subtitle {
      color: var(--text);
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
    }

    .feature-card {
      width: 250px;
      height: 250px;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: var(--card);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      }

      mat-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        color: var(--primary);
        margin-bottom: 1rem;
      }

      h2 {
        color: var(--primary);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text);
      }
    }
  `]
})
export class HomeComponent {}