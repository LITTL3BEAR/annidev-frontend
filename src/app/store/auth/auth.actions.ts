import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../core/auth/auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string; password: string }>(),
    'Login Success': props<{ user: User; token: string }>(),
    'Login Failure': props<{ error: any }>(),

    'Register': props<{ username: string; email: string; password: string }>(),
    'Register Success': props<{ user: User; token: string }>(),
    'Register Failure': props<{ error: any }>(),

    'Forgot Password': props<{ email: string }>(),
    'Forgot Password Success': emptyProps(),
    'Forgot Password Failure': props<{ error: any }>(),

    'Logout': emptyProps(),
  },
});
