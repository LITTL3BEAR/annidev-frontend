import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { SnackbarService } from '../../services/snackbar.service';

export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);
  private errorHandlingService = inject(ErrorHandlingService);

  // Login Effects
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) => AuthActions.loginSuccess({ user: response.user, token: response.token })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token }) => {
        this.authService.setToken(token);
        this.router.navigate(['/']);
        this.snackBar.success('Login successful.');
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        this.errorHandlingService.handleError(error);
      })
    ),
    { dispatch: false }
  );

  // Register Effects
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ username, email, password }) =>
        this.authService.register(username, email, password).pipe(
          map((response) => AuthActions.registerSuccess({ user: response.user, token: response.token })),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(({ token }) => {
        this.authService.setToken(token);
        this.router.navigate(['/']);
        this.snackBar.success('Register successful.');
      })
    ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerFailure),
      tap(({ error }) => {
        this.errorHandlingService.handleError(error);
      })
    ),
    { dispatch: false }
  );

  // Forgot Password Effects
  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(({ email }) =>
        this.authService.forgotPassword(email).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) => of(AuthActions.forgotPasswordFailure({ error })))
        )
      )
    )
  );

  forgotPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
      tap(() => {
        this.snackBar.success('Sent email successful.');
      })
    ),
    { dispatch: false }
  );

  forgotPasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordFailure),
      tap(({ error }) => {
        this.errorHandlingService.handleError(error);
      })
    ),
    { dispatch: false }
  );

  // Reset Password Effects
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      switchMap(({ token, newPassword }) =>
        this.authService.resetPassword(token, newPassword).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((error) => of(AuthActions.resetPasswordFailure({ error })))
        )
      )
    )
  );

  resetPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordSuccess),
      tap(() => {
        this.router.navigate(['/auth/login']);
        this.snackBar.success('Password reset successful. Please login with your new password.');
      })
    ),
    { dispatch: false }
  );

  resetPasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordFailure),
      tap(({ error }) => {
        this.errorHandlingService.handleError(error);
      })
    ),
    { dispatch: false }
  );

  // Logout Effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
        this.snackBar.success('Logged out successfully.');
      })
    ),
    { dispatch: false }
  );
}