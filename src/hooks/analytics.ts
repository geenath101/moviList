import { supabase } from '../lib/supabaseClient';

const logSearch = async (
  searchTerm: string,
  count: number,
  posterUrl?: string,
  movieId?: number
): Promise<void> => {
  // setIsLogging(true);
  try {
    console.log('Would log search:', { searchTerm, count, posterUrl, movieId });
    const { error } = await supabase.from('search_info').insert({
      search_term: searchTerm.trim().toLowerCase(),
      count: count,
      poster_url: posterUrl,
      movie_id: movieId,
    });

    if (error) {
      console.error('Error logging search:', error);
    }
  } catch (err) {
    console.error('Failed to log search:', err);
  } finally {
    //setIsLogging(false);
  }
};

export default logSearch;
export { logSearch };
