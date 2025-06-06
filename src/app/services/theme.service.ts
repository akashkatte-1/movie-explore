import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private STORAGE_KEY = 'movieExplorer.darkMode';
  
  isDarkMode = signal<boolean>(this.getSavedTheme());

  private getSavedTheme(): boolean {
    const savedPreference = localStorage.getItem(this.STORAGE_KEY);
    if (savedPreference !== null) {
      return JSON.parse(savedPreference);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const newValue = !this.isDarkMode();
    this.isDarkMode.set(newValue);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newValue));
  }
}