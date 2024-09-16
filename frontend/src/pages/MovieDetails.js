import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {movie ? (
        <div className='movie-details'>
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt="poster" />
          <p>{movie.Genre}</p>
          <p>{movie.Released}</p>
          <p>{movie.Actors}</p>
          <p>{movie.Plot}</p>
          <Link to="/">Back to Search</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
