const express = require('express');
const mongoose = require('mongoose');
const Cinema = require('../models/Cinema');

const router = express.Router();

// GET - todos los cines y las peliculas que emiten
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los cines',
      error: error.message
    });
  }
});

// GET - cines que emiten una pelicula concreta
router.get('/movie/:movieId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
      return res.status(400).json({ message: 'ID no valido' });
    }

    const cinemas = await Cinema.find({
      movies: req.params.movieId
    }).populate('movies');

    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar los cines',
      error: error.message
    });
  }
});

module.exports = router;
