# Angular Movie Explorer App

## Project Overview

The **Movie Explorer App** is a web application designed to allow users to browse, search, and filter movies with rich details fetched from an API or a static dataset. It provides an engaging way to explore movie posters, titles, ratings, genres, and in-depth information about each movie, including cast and trailers. The app features a responsive design that works seamlessly across mobile and desktop devices.

## Features

### Core Features

- 🎬 **Movie Listing Page:**  
  Displays a grid of movies showing poster images, titles, ratings, and genres.

- 🔍 **Search Movies:**  
  Users can search for movies by title using an input field.

- 📄 **Movie Details Page:**  
  Clicking on a movie opens a detailed view including title, description, cast, trailer link, and more.

- 📂 **Genre Filter:**  
  Filter movies by genre/category to narrow down choices.

- 💻 **Responsive Layout:**  
  Optimized for both desktop and mobile devices, providing a smooth user experience.

### Bonus Features (Implemented)

- ❤️ **Add to Favorites:**  
  Users can add movies to their favorites list, which is saved in Local Storage for persistence.

- 🕵️‍♂️ **Actor Profile Page:**  
  Clicking an actor’s name shows their biography and a list of movies they have starred in.

- 🌙 **Dark Mode Toggle:**  
  Switch between light and dark themes for comfortable viewing in any lighting.

- 🧠 **Pagination / Infinite Scroll:**  
  Efficiently load and browse through a large number of movies.

- 📊 **Rating Filter Slider:**  
  Filter movies based on user ratings, e.g., show only movies with ratings above 7.

## API Usage Details

- The app fetches movie data from [TMDb API](https://www.themoviedb.org/documentation/api) or uses a preloaded static dataset depending on the setup.
- Endpoints used typically include:
  - **Search movies:** `/search/movie`
  - **Movie details:** `/movie/{movie_id}`
  - **Actor details:** `/person/{person_id}`
- API key management is handled via environment variables or a config file to keep keys secure.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akashkatte-1/movie-explore.git
   cd movie-explore
2. **Start the server:**
   ```bash
   ng serve -o
3. **To View Live website:**
   https://poetic-douhua-c57f9c.netlify.app/
