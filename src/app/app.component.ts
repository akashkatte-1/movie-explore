import { Component, effect, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
  template: `
    <div [class.dark]="isDarkMode()" class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <app-header />
      <main class="container mx-auto px-4 py-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDarkMode());
    });
  }
}