import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Login actions
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    loading: false,
    error
  })),

  // Register actions
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Forgot password actions
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    loading: true,
    error: null,
    forgotPasswordMessage: null
  })),
  on(AuthActions.forgotPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    forgotPasswordMessage: message,
    error: null
  })),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    forgotPasswordMessage: null
  })),

  // Logout action
  on(AuthActions.logout, () => initialState)
);

export { AuthState };