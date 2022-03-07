import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import timeConverter from "../utils/timeConverter";

export default function SingleMovie() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const imageLink = `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    // Set loading state while fetching data.
    setLoading(true);

    // Get single movie based of the ID and url above and set the state to be that movie.
    async function getMovie() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    /* Decided to create a function to dynamically get the image URL instead of hardcoding, 
    in case the URL gets changed with time. Worth the code? */
    async function getImageUrl() {
      try {
        const response = await fetch(imageLink);
        const data = await response.json();

        // Removes last character of the url, else it would break the image URL with 2x slashes (//)
        const editedUrl = data.images.secure_base_url.slice(0, -1);
        setImageUrl(editedUrl + "/w500");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getImageUrl();
    getMovie();
  }, [id]);

  if (loading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }
  if (!movie) {
    return <h2>no movie to display</h2>;
  } else {
    const {
      original_title,
      overview,
      release_date,
      vote_average,
      poster_path,
      runtime,
      genres,
    } = movie;
    return (
      <section>
        <Link to="/">back home</Link>
        <h2>
          {original_title}
          <span>({release_date.substring(0, 4)})</span>
        </h2>
        <div>
          <img src={`${imageUrl}${poster_path}`} alt={original_title} />
          <div>
            <p>
              <span>Description:</span> {overview}
            </p>
            <p>
              <span>Release date:</span>
              {release_date}
            </p>
            <p>
              <span>Score:</span> {vote_average}
            </p>
            <p>
              <span>Runtime: </span>
              {timeConverter(runtime)}
            </p>
            <p>
              <span>Genres:</span>
              {genres.map((genre, index, arr) => {
                /* Checks if it's last item in the array, if so doesn't att the comma at the end. */
                return arr.length - 1 === index ? (
                  <span key={index}> {genre.name} </span>
                ) : (
                  <span key={index}> {genre.name}, </span>
                );
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
