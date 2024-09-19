import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://search-movies-backend.onrender.com/api/movie/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="lds-container">
          <p>Just a sec. Details is loading...</p>
          <Loader />
        </div>
      ) : (
        <div className="movie-details">
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt="poster" />
          <p>{movie.Genre}</p>
          <p>{movie.Released}</p>
          <p>{movie.Actors}</p>
          <p>{movie.Plot}</p>
          <Link to="/">Back to Search</Link>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
