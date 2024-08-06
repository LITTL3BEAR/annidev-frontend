import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { HomeComponent } from './shared/components/home.component';
import { NotFoundComponent } from './shared/components/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'manga',
    loadChildren: () => import('./features/manga/manga.routes').then(m => m.MANGA_ROUTES),
    canActivate: [authGuard]
  },
  { path: '**', component: NotFoundComponent }
];