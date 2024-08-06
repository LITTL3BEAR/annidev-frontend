import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

export * from './auth';