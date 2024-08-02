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
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, () => initialState),

  on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.forgotPassword, (state) => ({ ...state, loading: true, error: null, forgotPasswordMessage: null })),
  on(AuthActions.forgotPasswordSuccess, (state, { message }) => ({ ...state, loading: false, forgotPasswordMessage: message })),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),
);