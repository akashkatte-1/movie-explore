import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { GenreFilterComponent } from '../../components/genre-filter/genre-filter.component';
import { RatingFilterComponent } from '../../components/rating-filter/rating-filter.component';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule,
    MovieCardComponent, 
    SearchBarComponent, 
    GenreFilterComponent,
    RatingFilterComponent
  ],
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-6">Discover Movies</h1>
      
      <app-search-bar 
        (search)="onSearch($event)" 
      />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-1 space-y-4">
        <app-genre-filter 
          [genres]="movieService.availableGenres()" 
          [selectedGenres]="selectedGenres"
          (genreChange)="onGenreChange($event)" 
        />
        
        <app-rating-filter 
          [rating]="minRating"
          (ratingChange)="onRatingChange($event)" 
        />
      </div>
      
      <div class="lg:col-span-3">
        <div *ngIf="movieService.filteredMovies().length === 0" class="flex flex-col items-center justify-center py-16">
          <p class="text-xl text-slate-500 mb-4">No movies found matching your criteria</p>
          <button 
            (click)="resetFilters()"
            class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors">
            Reset Filters
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <app-movie-card 
            *ngFor="let movie of movieService.filteredMovies()" 
            [movie]="movie" 
          />
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  
  selectedGenres: string[] = [];
  minRating: number = 0;
  
  ngOnInit(): void {
    // We could load data here, but service constructor is handling it
  }
  
  onSearch(query: string): void {
    this.movieService.setSearchQuery(query);
  }
  
  onGenreChange(genres: string[]): void {
    this.selectedGenres = genres;
    this.movieService.setSelectedGenres(genres);
  }
  
  onRatingChange(rating: number): void {
    this.minRating = rating;
    this.movieService.setMinRating(rating);
  }
  
  resetFilters(): void {
    this.selectedGenres = [];
    this.minRating = 0;
    this.movieService.setSearchQuery('');
    this.movieService.setSelectedGenres([]);
    this.movieService.setMinRating(0);
  }
}