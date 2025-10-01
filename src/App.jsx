import { useState, useEffect } from 'react';
import Search from './components/search';
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONSS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // const queryParameters = new URLSearchParams();
  // queryParameters.append();

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchMovies = async (searchQuery) => {
    try {
      let endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      if (searchQuery) {
        console.log(`searchQuery : ${searchQuery}`);
        endpoint = `${API_BASE_URL}/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
      }
      console.log(searchQuery);
      const response = await fetch(endpoint, API_OPTIONSS);
      if (!response.ok) {
        throw new Error('failed to read movies');
      }
      const data = await response.json();
      setMovieList(() => [...data.results]);
      setIsLoading(false);
    } catch (error) {
      console.log(`Error fetching movies :${error}`);
      setErrorMessage('Error fetching movies please try again later...');
    }
  };

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            <img src="./hero-img.png" alt="Hero Banner" />
            Find <span className="text-gradient"> Movies </span>you'll Enjoy
            without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ) : (
            <ul>
              {
                /* {movieList.map((m) => (
                <p key={m.id} className="text-white">
                  {m.title}
                </p>
              ))} */

                movieList.map((m) => (
                  <MovieCard key={m.id} movie={m}></MovieCard>
                ))
              }
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
