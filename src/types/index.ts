// Shared type definitions for the movie app

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
  original_language: string;
}

export interface TMDBResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

export interface SearchAnalytics {
  search_term: string;
  count: number;
  poster_url?: string;
  movie_id?: number;
  searched_at?: string;
}
