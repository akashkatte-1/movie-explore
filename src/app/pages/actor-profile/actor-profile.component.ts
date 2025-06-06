import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Actor, Movie } from '../../models/movie.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-actor-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardComponent, HttpClientModule],
  template: `
    <div *ngIf="actor; else loading" class="animate-fadeIn">
      <button 
        (click)="goBack()" 
        class="mb-4 flex items-center text-orange-500 hover:text-orange-700 transition-colors"
      >
        <span class="mr-1">←</span> Back
      </button>
      
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="md:flex">
          <div class="md:w-1/4">
            <img [src]="actor.photo" [alt]="actor.name" class="w-full h-80 object-cover">
          </div>
          
          <div class="md:w-3/4 p-6">
            <h1 class="text-3xl font-bold mb-4">{{ actor.name }}</h1>
            
            <div *ngIf="actor.birthdate" class="mb-4 text-slate-600 dark:text-slate-300">
              <span>Born: {{ actor.birthdate }}</span>
            </div>
            
            <p class="text-lg mb-6">{{ actor.bio || 'No biography available.' }}</p>
          </div>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mb-4">Filmography</h2>
      
      <div *ngIf="movies.length > 0; else noMovies" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" />
      </div>
      
      <ng-template #noMovies>
        <p class="text-slate-500">No movies found for this actor.</p>
      </ng-template>
    </div>
    
    <ng-template #loading>
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </ng-template>
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
export class ActorProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  
  actor?: Actor;
  movies: Movie[] = [];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadActor(id);
    });
  }
  
  loadActor(id: number): void {
    this.movieService.getActor(id).subscribe(actor => {
      if (actor) {
        this.actor = actor;
        if (actor.filmography) {
          this.movies = this.movieService.getMoviesByIds(actor.filmography);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}