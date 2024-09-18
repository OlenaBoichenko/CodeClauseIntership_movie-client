import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // user enters a movie title
  const [movies, setMovies] = useState([]); // list of movies
  const [query, setQuery] = useState(""); // current request

  // Fetch initial movies from the API 
  const fetchInitialMovies = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://search-movies-backend.onrender.com/api/movies/ocean`
      );
      const initialMovies = response.data.Search || [];
      setMovies(initialMovies);

      // Save initial data in localStorage
      localStorage.setItem("movies", JSON.stringify(initialMovies));
    } catch (error) {
      console.error("Error fetching initial movies:", error);
    }
  }, []);

  // Function to perform a search based on user input
  const handleSearch = useCallback(async () => {
    if (query.trim() !== "") {
      // only if the request is non-empty
      try {
        const response = await axios.get(
          `https://search-movies-backend.onrender.com/api/movies?query=${query}`
        );
        const fetchedMovies = response.data.Search || [];
        setMovies(fetchedMovies);

        // save searched movies in localStorage
        localStorage.setItem("movies", JSON.stringify(fetchedMovies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  }, [query]);

  // Load initial data
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);
      setMovies(parsedMovies);
    } else {
      fetchInitialMovies(); // Fetch initial movies from API if localStorage is empty
    }
  }, [fetchInitialMovies]);

  // Search for movies
  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query, handleSearch]);

  // Button click or Enter key
  const handleButtonClick = () => {
    setQuery(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(searchTerm);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
        onKeyDown={handleKeyDown}
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
