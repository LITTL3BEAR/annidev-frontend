import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({ ...state, user, token, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, token: null, loading: false, error })),

  on(AuthActions.register, (state) => ({ ...state, loading: true })),
  on(AuthActions.registerSuccess, (state, { user, token }) => ({ ...state, user, token, loading: false, error: null })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, user: null, token: null, loading: false, error })),

  on(AuthActions.forgotPassword, (state) => ({ ...state, loading: true })),
  on(AuthActions.forgotPasswordSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.logout, () => initialState)
);
