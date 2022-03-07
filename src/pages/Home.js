import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import GenresMenu from "../components/GenresMenu";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Home() {
  const { startFetch, setStartFetch } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  /* I create a const with all the genres in my movies data,
  Then I use the Set object to return ONLY the unique values. 
  This way I will have an array consisting of every genre in my data.
  Also hardcore the "All" value since there is no genre called "All".
  */
  const allGenres = [
    "all",
    ...new Set(
      allMovies.map((movie) => {
        for (let i = 0; i < movie.genre_ids.length; i++) {
          return movie.genre_ids[i];
        }
      })
    ),
  ];

  // Fetch genres from themoviedb, needed for my GenresMenu.
  const fetchGenres = async () => {
    const reponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await reponse.json();
    setGenres(data.genres);
  };

  // Fetch popular movies from themoviedb
  const fetchMovies = async () => {
    let hundredMoviesArray = [];

    /* Loop through themoviedb API's 5 first pages, 
    each page consists of 20 movies and I need the top 100 movies. 
    I concatinate every response to my hundredMoviesArray, 
    so by the last loop I have an array consisting of 100 movie objects.  */
    for (let i = 1; i < 6; i++) {
      const reponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${i}`
      );
      const data = await reponse.json();
      const newMovies = data.results;

      hundredMoviesArray = hundredMoviesArray.concat(newMovies);
    }

    /* I have two movie states, one that will always consist of All 100 movies
    and one that get's changed based on my filtering from the genres menu. 
    The filtering is handled in the filterMoviesByGenre function below. */
    setMovies(hundredMoviesArray);
    setAllMovies(hundredMoviesArray);

    /* Using timeout to force show the loading state, incase the api fetch is too quick! */
    setTimeout(function () {
      setLoading(false);
    }, 700);
  };

  const startFetchingMovies = async () => {
    setStartFetch(true);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [startFetch]);

  const filterMoviesByGenre = (genre) => {
    if (genre === "all") {
      setMovies(allMovies);
      return;
    }

    const filteredMovies = allMovies.filter((movie) => {
      for (let i = 0; i < movie.genre_ids.length; i++) {
        if (movie.genre_ids[i] === genre) {
          return movie;
        }
      }
    });
    setMovies(filteredMovies);
  };

  return (
    <main>
      <section className="section">
        <div className="title">
          <Link to="/">
            <h2 className="section-header">The Movie DB</h2>
          </Link>
          <div className="underline"></div>
        </div>
        {startFetch ? (
          loading ? (
            <section className="section loading">
              <h1>Loading...</h1>
            </section>
          ) : (
            <div className="movies-center">
              <GenresMenu
                allGenres={allGenres}
                genres={genres}
                filterMoviesByGenre={filterMoviesByGenre}
              />
              <article>
                <MovieList movies={movies} />
              </article>
            </div>
          )
        ) : (
          <button
            onClick={startFetchingMovies}
            className="btn btn-fetch-movies"
          >
            Hämta Filmer
          </button>
        )}
      </section>
    </main>
  );
}

export default Home;
