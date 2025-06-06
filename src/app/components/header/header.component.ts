import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="bg-white dark:bg-slate-800 shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-orange-500">
              <span class="mr-2">🎬</span>MovieExplorer
            </a>
          </div>

          <nav class="flex items-center gap-6">
            <a routerLink="/" routerLinkActive="text-orange-500" [routerLinkActiveOptions]="{exact: true}" 
               class="font-medium hover:text-orange-500 transition">Home</a>
            <a routerLink="/favorites" routerLinkActive="text-orange-500"
               class="font-medium hover:text-orange-500 transition">Favorites</a>
            <button (click)="toggleTheme()" class="ml-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <span *ngIf="isDarkMode()" class="text-xl">☀️</span>
              <span *ngIf="!isDarkMode()" class="text-xl">🌙</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}