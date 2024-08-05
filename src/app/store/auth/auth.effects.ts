import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class AuthEffects {
  // Login effects
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
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        this.snackBar.open(`Login failed: ${error}`, 'Close', { duration: 5000 });
      })
    ),
    { dispatch: false }
  );

  // Register effects
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
        this.snackBar.open('Register successful', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  // Forgot Password effects
  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(({ email }) =>
        this.authService.forgotPassword(email).pipe(
          map((message) => AuthActions.forgotPasswordSuccess({ message })),
          catchError((error) => of(AuthActions.forgotPasswordFailure({ error })))
        )
      )
    )
  );

  // Logout effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
}