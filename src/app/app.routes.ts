import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Movie Explorer - Home'
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie-details/movie-details.component').then(m => m.MovieDetailsComponent),
    title: 'Movie Details'
  },
  {
    path: 'actor/:id',
    loadComponent: () => import('./pages/actor-profile/actor-profile.component').then(m => m.ActorProfileComponent),
    title: 'Actor Profile'
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent),
    title: 'My Favorites'
  },
  {
    path: '**',
    redirectTo: ''
  }
];