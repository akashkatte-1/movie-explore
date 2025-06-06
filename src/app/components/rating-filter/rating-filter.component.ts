import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold text-lg">Rating</h3>
        <span class="bg-yellow-400 text-yellow-900 font-bold rounded px-2 py-1">
          ★ {{ rating }}+
        </span>
      </div>
      
      <input 
        type="range" 
        min="0" 
        max="10" 
        step="0.5"
        [(ngModel)]="rating"
        (ngModelChange)="onRatingChange()"
        class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
      >
      
      <div class="flex justify-between text-xs mt-1 text-slate-500">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  `
})
export class RatingFilterComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  
  onRatingChange(): void {
    this.ratingChange.emit(this.rating);
  }
}