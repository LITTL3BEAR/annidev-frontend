import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlingService = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandlingService.handleError(error);
      return throwError(() => error);
    })
  );
};