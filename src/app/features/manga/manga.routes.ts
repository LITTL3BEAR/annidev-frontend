import { Routes } from '@angular/router';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';

export const MANGA_ROUTES: Routes = [
  { path: '', component: MangaListComponent },
  { path: ':id', component: MangaDetailComponent }
];