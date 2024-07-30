import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  user: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logout, () => initialState),
  on(AuthActions.forgetPassword, (state) => ({ ...state, loading: true, error: null, forgetPasswordMessage: null })),
  on(AuthActions.forgetPasswordSuccess, (state, { message }) => ({ ...state, loading: false, forgetPasswordMessage: message })),
  on(AuthActions.forgetPasswordFailure, (state, { error }) => ({ ...state, loading: false, error }))
);