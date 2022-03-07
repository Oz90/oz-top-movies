import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  /* Function that checks the score of the movie and returns a classname to set 
  a CSS class based on score */
  function checkScore(vote_average) {
    if (vote_average > 7.4) {
      return "movie-green";
    } else if (vote_average <= 7.4 && vote_average >= 5) {
      return "movie-yellow";
    } else {
      return "movie-red";
    }
  }

  return (
    <section className="movies">
      {movies.map((movieItem) => {
        const { id, original_title, poster_path, release_date, vote_average } =
          movieItem;
        return (
          <Link to={`/movie/${id}`} key={id} className="movie">
            <article>
              <img
                /* Hardcoded link, does this need to be dynamic in some way
              in case API changes? I tried another solution in SingleMovie.js */
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={original_title}
              />
              <div className="movie-info">
                <h3 className="movie-title">{original_title}</h3>
                <h4 className={checkScore(vote_average)}>
                  Score: {vote_average}
                </h4>
                <p>Released: {release_date}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default MovieList;
