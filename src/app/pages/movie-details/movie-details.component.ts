import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { FavoritesService } from '../../services/favorites.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
    <div *ngIf="movie; else loading" class="animate-fadeIn">
      <button 
        (click)="goBack()" 
        class="mb-4 flex items-center text-orange-500 hover:text-orange-700 transition-colors"
      >
        <span class="mr-1">←</span> Back to movies
      </button>
      
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/3">
            <div class="relative h-full">
              <img [src]="movie.poster" [alt]="movie.title" class="w-full h-full object-cover">
              <div class="absolute top-4 right-4">
                <button 
                  (click)="toggleFavorite()" 
                  class="bg-white dark:bg-slate-800 rounded-full p-3 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span class="text-xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="md:w-2/3 p-6">
            <div class="flex justify-between items-start">
              <h1 class="text-3xl font-bold mb-2">{{ movie.title }} ({{ movie.year }})</h1>
              <span class="bg-yellow-400 text-yellow-900 font-bold rounded px-3 py-1">
                ★ {{ movie.rating.toFixed(1) }}
              </span>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                *ngFor="let genre of movie.genres" 
                class="text-sm bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full"
              >
                {{ genre }}
              </span>
            </div>
            
            <div class="mb-4 text-slate-500 dark:text-slate-400">
              <span>{{ movie.runtime }} • Directed by {{ movie.director }}</span>
            </div>
            
            <p class="text-lg mb-6">{{ movie.plot }}</p>
            
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-3">Cast</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <a 
                  *ngFor="let actor of movie.cast" 
                  [routerLink]="['/actor', actor.id]"
                  class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <img [src]="actor.photo" [alt]="actor.name" class="w-12 h-12 rounded-full object-cover">
                  <div>
                    <p class="font-medium">{{ actor.name }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ actor.character }}</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div *ngIf="movie.trailerUrl">
              <a 
                [href]="movie.trailerUrl" 
                target="_blank" 
                class="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                <span class="mr-2">▶</span> Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ng-template #loading>
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </ng-template>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `]
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  
  movie?: Movie;
  
  get isFavorite(): boolean {
    return this.movie ? this.favoritesService.isFavorite(this.movie.id) : false;
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadMovie(id);
    });
  }
  
  loadMovie(id: number): void {
    this.movieService.getMovie(id).subscribe(movie => {
      if (movie) {
        this.movie = movie;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  
  toggleFavorite(): void {
    if (this.movie) {
      this.favoritesService.toggleFavorite(this.movie.id);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}