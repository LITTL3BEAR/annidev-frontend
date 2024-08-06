import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private snackBar = inject(MatSnackBar);

  handleError(error: HttpErrorResponse): void {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: The server could not understand the request.';
          break;
        case 401:
          errorMessage = 'Unauthorized: You need to be authenticated to access this resource.';
          break;
        case 403:
          errorMessage = 'Forbidden: You don\'t have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource could not be found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Something went wrong on the server.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.error.message}`;
      }
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    console.error('Error occurred:', error);
  }
}