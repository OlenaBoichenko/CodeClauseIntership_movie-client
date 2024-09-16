const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config()
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// Movie search route
app.get('/api/movies', async (req, res) => {
    const searchQuery = req.query.query;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
    res.json(response.data);
});

// Directions to get details about a movie
app.get('/api/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
    res.json(response.data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
