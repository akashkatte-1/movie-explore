import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor, Movie } from '../models/movie.interface';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  
  private movies = signal<Movie[]>([]);
  private actors = signal<Actor[]>([]);
  
  private searchQuery = signal<string>('');
  private selectedGenres = signal<string[]>([]);
  private minRating = signal<number>(0);
  
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
  
  setSelectedGenres(genres: string[]): void {
    this.selectedGenres.set(genres);
  }
  
  setMinRating(rating: number): void {
    this.minRating.set(rating);
  }
  
  // Computed signal for filtered movies
  filteredMovies = computed(() => {
    return this.movies()
      .filter(movie => 
        movie.title.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
      .filter(movie => 
        this.selectedGenres().length === 0 || 
        movie.genres.some(genre => this.selectedGenres().includes(genre))
      )
      .filter(movie => 
        movie.rating >= this.minRating()
      );
  });
  
  // Computed signal for available genres
  availableGenres = computed(() => {
    const genreSet = new Set<string>();
    this.movies().forEach(movie => {
      movie.genres.forEach(genre => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  });

  constructor() {
    this.loadMovies();
  }
  
  loadMovies(): void {
    this.http.get<Movie[]>('assets/data/movies.json')
      .pipe(
        tap(data => {
          this.movies.set(data);
          
          // Extract actors from movies
          const actorsMap = new Map<number, Actor>();
          data.forEach(movie => {
            movie.cast.forEach(actor => {
              if (!actorsMap.has(actor.id)) {
                actorsMap.set(actor.id, actor);
              }
            });
          });
          this.actors.set(Array.from(actorsMap.values()));
        })
      )
      .subscribe();
  }
  
  getMovie(id: number): Observable<Movie | undefined> {
    const movie = this.movies().find(m => m.id === id);
    return of(movie);
  }
  
  getActor(id: number): Observable<Actor | undefined> {
    const actor = this.actors().find(a => a.id === id);
    
    if (actor) {
      // Get movies this actor appears in
      const filmography = this.movies()
        .filter(movie => movie.cast.some(cast => cast.id === id))
        .map(movie => movie.id);
      
      return of({
        ...actor,
        filmography
      });
    }
    
    return of(undefined);
  }
  
  getMoviesByIds(ids: number[]): Movie[] {
    return this.movies().filter(movie => ids.includes(movie.id));
  }
}