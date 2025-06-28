import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
      <h3 class="font-bold text-lg mb-3">Genres</h3>

      <div class="flex flex-wrap gap-2">
        <label
          *ngFor="let genre of genres"
          class="cursor-pointer inline-flex items-center"
        >
          <input
            type="checkbox"
            [value]="genre"
            (change)="onToggleGenre(genre)"
            [checked]="isGenreSelected(genre)"
            class="sr-only"
          >

          <span
            class="px-3 py-1 rounded-full text-sm transition-colors"
            [class.bg-orange-500]="isGenreSelected(genre)"
            [class.text-white]="isGenreSelected(genre)"
            [class.bg-slate-100]="!isGenreSelected(genre)"
            [class.dark:bg-slate-700]="!isGenreSelected(genre)"
          >
            {{ genre }}
          </span>
        </label>
      </div>

      <button
        *ngIf="selectedGenres.length > 0"
        (click)="onClearAll()"
        class="mt-3 text-sm text-orange-500 hover:text-orange-700 dark:hover:text-orange-300"
      >
        Clear all
      </button>
    </div>
  `
})
export class GenreFilterComponent {
  @Input() genres: string[] = [];
  @Input() selectedGenres: string[] = [];
  @Output() genreChange = new EventEmitter<string[]>();

  /**
   * Check if a genre is currently selected.
   * @param genre Genre to check
   * @returns boolean indicating selection state
   */
  isGenreSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }

  /**
   * Toggle the selection of a genre.
   * @param genre Genre to toggle
   */
  onToggleGenre(genre: string): void {
    const updatedGenres = this.isGenreSelected(genre)
      ? this.selectedGenres.filter(g => g !== genre)
      : [...this.selectedGenres, genre];

    this.genreChange.emit(updatedGenres);
  }

  /**
   * Clear all selected genres.
   */
  onClearAll(): void {
    this.genreChange.emit([]);
  }
}
