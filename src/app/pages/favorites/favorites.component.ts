import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardComponent, HttpClientModule],
  template: `
    <div class="animate-fadeIn">
      <h1 class="text-3xl font-bold mb-6">My Favorites</h1>
      
      <div *ngIf="favoriteMovies.length === 0" class="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <p class="text-xl text-slate-500 mb-4">You haven't added any favorite movies yet</p>
        <a 
          routerLink="/" 
          class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
        >
          Discover Movies
        </a>
      </div>
      
      <div *ngIf="favoriteMovies.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-movie-card 
          *ngFor="let movie of favoriteMovies" 
          [movie]="movie" 
        />
      </div>
    </div>
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
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private movieService = inject(MovieService);
  
  favoriteMovies: Movie[] = [];
  
  ngOnInit(): void {
    // When we first load, get all the favorite movies
    this.updateFavoriteMovies();
    
    // We need to set up monitoring for changes to favorites
    // This would typically use an Observable, but for simplicity
    // we'll just update whenever the component is activated
  }
  
  updateFavoriteMovies(): void {
    const favoriteIds = this.favoritesService.getFavoriteIds();
    this.favoriteMovies = this.movieService.getMoviesByIds(favoriteIds);
  }
}