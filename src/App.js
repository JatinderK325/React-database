import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  // To show loading spinner or loading text, in react its just managing state. we can tell whether waiting or not.
  const [isLoading, setIsLoading] = useState(false);
  // for handling http errors
  const [error, setError] = useState(null);

  /* const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ]; */
  // we will use fetch API to fetch movies : using GET request
  /*
  function fetchMoviesHandler() { 
    fetch('https://swapi.dev/api/films/').then((response) => {
      return response.json();
    }).then((data) => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies);
    })
  } */

  // when we are dealing with 'promises', we can build 'then' calls. we can also use its alternative syntax. Alternative syntax: using async/await.....
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      // const response2 = await fetch('https://swapi.dev/api/film/');
      // try response2 with wrong url (film instead of films) to see the result of try-catch block
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // using useEffect() to make sure that we send a http request immediately when a component loads not only on the click of the button.
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); // here we have added 'fetchMoviesHandler' as a dependency for the 'useEffect'. As we know functions are the objects and whenever the component re-executes, it will be re-created again and again that's why we need to wrap 'fetchMoviesHandler' with 'useCallback' and to use dependency with useCallback in order to re-create function only in the given condition (dependency) in the dependency array of useCallback.  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {/* to show content when we are not loading but did not get movies yet, means if movies' array is empty. */}
        {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
