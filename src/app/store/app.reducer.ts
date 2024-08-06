import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../core/auth/store';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};