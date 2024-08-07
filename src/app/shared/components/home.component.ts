import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="container">
      <h1>Welcome to Minimal Earth</h1>
      <p>Explore our earth-toned, minimalist design through these sample notifications:</p>
      <div class="button-container">
        <button mat-raised-button color="primary" (click)="showSnackbar('success')">Success Message</button>
        <button mat-raised-button color="warn" (click)="showSnackbar('error')">Error Message</button>
        <button mat-raised-button color="accent" (click)="showSnackbar('info')">Info Message</button>
        <button mat-stroked-button (click)="showSnackbar('warning')">Warning Message</button>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  private snackBar = inject(SnackbarService);

  showSnackbar(type: 'success' | 'error' | 'info' | 'warning'): void {
    switch (type) {
      case 'success':
        this.snackBar.success('Operation completed successfully.');
        break;
      case 'error':
        this.snackBar.error('An error occurred. Please try again.');
        break;
      case 'info':
        this.snackBar.info('Here\'s some useful information for you.');
        break;
      case 'warning':
        this.snackBar.warning('Caution: This action may have consequences.');
        break;
    }
  }
}