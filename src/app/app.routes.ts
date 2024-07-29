import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'manga',
    loadChildren: () => import('./features/manga/manga.routes').then(m => m.MANGA_ROUTES),
    canActivate: [AuthGuard]
  }
];