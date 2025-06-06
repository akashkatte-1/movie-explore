export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  rating: number;
  runtime: string;
  genres: string[];
  plot: string;
  director: string;
  cast: Actor[];
  trailerUrl: string;
}

export interface Actor {
  id: number;
  name: string;
  photo: string;
  character: string;
  bio?: string;
  birthdate?: string;
  filmography?: number[]; // IDs of movies
}