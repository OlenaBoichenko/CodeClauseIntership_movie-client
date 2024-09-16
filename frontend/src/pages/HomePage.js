import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:5000/api/movies?query=${searchTerm}`);
    setMovies(response.data.Search || []);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className='movie-list'>
        {movies.map(movie => (
          <div key={movie.imdbID} className='movie-item'>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt="poster" />
            <Link to={`/movie/${movie.imdbID}`}>More Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
