import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>ANNIDEV</span>
      <button mat-icon-button (click)="themeService.toggleDarkTheme()">
        <mat-icon>{{ themeService.isDarkTheme$() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class HeaderComponent {
  protected themeService = inject(ThemeService);
}