import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div class="relative group">
        <img [src]="movie.poster" [alt]="movie.title" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105">
        <div class="absolute top-0 right-0 p-2">
          <button 
            (click)="toggleFavorite($event)" 
            class="bg-white dark:bg-slate-800 rounded-full p-2 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span class="text-xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
          </button>
        </div>
        <div class="absolute bottom-0 left-0 p-2">
          <span class="inline-block bg-yellow-400 text-yellow-900 font-bold rounded px-2 py-1">
            ★ {{ movie.rating.toFixed(1) }}
          </span>
        </div>
      </div>
      
      <div class="p-4 flex-grow">
        <h3 class="text-lg font-bold mb-1 line-clamp-2">{{ movie.title }} ({{ movie.year }})</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          <span 
            *ngFor="let genre of movie.genres.slice(0, 2)" 
            class="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
            {{ genre }}
          </span>
          <span 
            *ngIf="movie.genres.length > 2" 
            class="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
            +{{ movie.genres.length - 2 }}
          </span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{{ movie.plot }}</p>
      </div>
      
      <div class="p-4 pt-0">
        <a [routerLink]="['/movie', movie.id]" 
           class="block text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors">
          View Details
        </a>
      </div>
    </div>
  `
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  
  private favoritesService = inject(FavoritesService);
  
  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.movie.id);
  }
  
  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.movie.id);
  }
}