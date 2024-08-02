import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any; token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const register = createAction('[Auth] Register', props<{ username: string; email: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: any; token: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: any }>());

export const forgotPassword = createAction('[Auth] Forget Password', props<{ email: string }>());
export const forgotPasswordSuccess = createAction('[Auth] Forget Password Success', props<{ message: string }>());
export const forgotPasswordFailure = createAction('[Auth] Forget Password Failure', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');