import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
      <nav></nav>
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

      span {
        margin-right: 16px; // ให้มีระยะห่างระหว่าง ANNIDEV กับ nav items
      }

      nav {
        flex-grow: 1; // ทำให้ nav ขยายเต็มพื้นที่ที่เหลือ
        display: flex;
        justify-content: flex-start; // จัด nav items ชิดซ้าย
        align-items: center;
      }

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