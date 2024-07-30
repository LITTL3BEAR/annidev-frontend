import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>ANNIDEV</span>
      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon>{{ (isDarkTheme$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        margin-left: auto; // ดัน button ไปทางขวาสุด
      }
    }
  `]
})
export class HeaderComponent {
  isDarkTheme$ = this.themeService.isDarkTheme$();

  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    this.themeService.toggleDarkTheme();
  }
}