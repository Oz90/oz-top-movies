import React from "react";

const GenresMenu = ({ allGenres, genres, filterMoviesByGenre }) => {
  /* allGenres is the Array I created in Home.js that holds a unique value of all arrays 
  of my movies data, also holds the "All" value because needed for the menu. 
  The genres prop is the genres data fetched from TMDB API. This holds an array
  with objects containing all the genres with their ID and their NAME. */
  return (
    <div>
      {allGenres.map((singleGenre, index) => {
        if (singleGenre === "all")
          return (
            <button
              type="button"
              key={index}
              onClick={() => filterMoviesByGenre(singleGenre)}
            >
              {singleGenre}
            </button>
          );
        else {
          return genres.map((genre) => {
            /* Check if singleGenre (ID from my allGenres list) equals to genre.id,
            if it does, we return genre.name (i.e "Horror"). */
            if (singleGenre === genre.id)
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => filterMoviesByGenre(singleGenre)}
                >
                  {genre.name}
                </button>
              );
          });
        }
      })}
    </div>
  );
};

export default GenresMenu;
