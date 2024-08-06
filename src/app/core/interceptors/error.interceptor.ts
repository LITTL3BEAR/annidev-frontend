import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        errorHandler.handleAuthError();
      } else if (!navigator.onLine) {
        errorHandler.handleNetworkError();
      } else {
        return errorHandler.handleError(error);
      }
      return throwError(() => error);
    })
  );
};