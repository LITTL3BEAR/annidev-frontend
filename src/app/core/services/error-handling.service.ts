import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private snackBar = inject(SnackbarService);

  handleError(error: Error | HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      errorMessage = this.handleHttpError(error);
    } else if (error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.message}`;
    } else {
      errorMessage = error.message || 'Unexpected error occurred.';
    }

    this.snackBar.error(errorMessage);
    console.error('Error occurred:', error);

    return throwError(() => new Error(errorMessage));
  }

  private handleHttpError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: return 'Bad request. Please check your input.';
      case 401: return 'Unauthorized. Please log in again.';
      case 403: return 'Forbidden. You don\'t have permission to access this resource.';
      case 404: return 'Resource not found.';
      case 500: return 'Internal server error. Please try again later.';
      default: return `Server Error: ${error.message}`;
    }
  }

  handleAuthError(): void {
    this.snackBar.error('Your session has expired. Please log in again.');
  }

  handleNetworkError(): void {
    this.snackBar.error('Network error. Please check your internet connection.');
  }
}