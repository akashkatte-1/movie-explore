import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span class="text-slate-500">🔍</span>
      </div>
      <input 
        type="text" 
        [(ngModel)]="searchValue"
        (ngModelChange)="onSearchChange()"
        [placeholder]="placeholder()"
        class="w-full p-3 pl-10 text-sm text-slate-900 dark:text-white border rounded-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
      >
      <button 
        *ngIf="searchValue"
        (click)="clearSearch()" 
        class="absolute inset-y-0 right-0 flex items-center pr-3">
        <span class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">✕</span>
      </button>
    </div>
  `
})
export class SearchBarComponent {
  searchValue = '';
  placeholder = input<string>('Search movies...');
  
  @Output() search = new EventEmitter<string>();
  
  onSearchChange(): void {
    this.search.emit(this.searchValue);
  }
  
  clearSearch(): void {
    this.searchValue = '';
    this.search.emit('');
  }
}