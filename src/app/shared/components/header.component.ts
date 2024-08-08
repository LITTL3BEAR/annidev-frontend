import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/auth/auth.service';
import { AuthActions } from '../../core/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
  template: `
    <mat-toolbar color="primary">
      <span>ANNIDEV</span>
      <div class="toolbar-actions">
        <button mat-icon-button (click)="themeService.toggleDarkTheme()" matTooltip="Toggle theme">
          <mat-icon>{{ themeService.isDarkTheme$() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
        @if (authService.isLoggedIn()) {
          <button mat-icon-button (click)="logout()" matTooltip="Logout">
            <mat-icon>exit_to_app</mat-icon>
          </button>
        }
      </div>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      justify-content: space-between;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `]
})
export class HeaderComponent {
  protected themeService = inject(ThemeService);
  protected authService = inject(AuthService);
  private store = inject(Store);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}