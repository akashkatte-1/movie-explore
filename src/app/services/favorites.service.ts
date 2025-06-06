import { Injectable, computed, signal } from '@angular/core';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private STORAGE_KEY = 'movieExplorer.favorites';
  private favoriteIds = signal<number[]>(this.getSavedFavorites());
  
  favoriteCount = computed(() => this.favoriteIds().length);
  
  constructor() { }
  
  private getSavedFavorites(): number[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
  
  private saveFavorites(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoriteIds()));
  }
  
  addFavorite(movieId: number): void {
    if (!this.isFavorite(movieId)) {
      this.favoriteIds.update(ids => [...ids, movieId]);
      this.saveFavorites();
    }
  }
  
  removeFavorite(movieId: number): void {
    this.favoriteIds.update(ids => ids.filter(id => id !== movieId));
    this.saveFavorites();
  }
  
  toggleFavorite(movieId: number): void {
    if (this.isFavorite(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }
  
  isFavorite(movieId: number): boolean {
    return this.favoriteIds().includes(movieId);
  }
  
  getFavoriteIds(): number[] {
    return this.favoriteIds();
  }
}