import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // user enters a movie title
  const [movies, setMovies] = useState([]); // list of movies
  const [query, setQuery] = useState(""); // current request

  // Function to perform a search
  const handleSearch = useCallback(async () => {
    if (query.trim() !== "") {
      // only if the request is non-empty
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies?query=${query}`
        );
        const fetchedMovies = response.data.Search || [];
        setMovies(fetchedMovies);

        // save data in localStorage
        localStorage.setItem("movies", JSON.stringify(fetchedMovies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  }, [query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // loading saved movies from localStorage
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);
      setMovies(parsedMovies); // Устанавливаем фильмы из localStorage, если они там есть
    }
  }, []);

  const handleButtonClick = () => {
    setQuery(searchTerm);
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
      <button onClick={handleButtonClick}>Search</button>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
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
