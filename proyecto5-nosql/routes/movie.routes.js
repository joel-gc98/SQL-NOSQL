const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const router = express.Router();

// GET - todas las peliculas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las peliculas', error: error.message });
  }
});

// GET - pelicula por ID
router.get('/id/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'No se ha encontrado ninguna pelicula con ese ID' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la pelicula', error: error.message });
  }
});

// GET - pelicula por titulo
router.get('/title/:title', async (req, res) => {
  try {
    const movie = await Movie.find({
      title: { $regex: `^${escapeRegex(req.params.title)}$`, $options: 'i' }
    });

    if (!movie.length) {
      return res.status(404).json({ message: 'No se ha encontrado ninguna pelicula con ese titulo' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar por titulo', error: error.message });
  }
});

// GET - peliculas por genero
router.get('/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({
      genre: { $regex: `^${escapeRegex(req.params.genre)}$`, $options: 'i' }
    });

    if (!movies.length) {
      return res.status(404).json({ message: 'No se han encontrado peliculas de ese genero' });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar por genero', error: error.message });
  }
});

// GET - peliculas posteriores al año indicado
router.get('/year/:year', async (req, res) => {
  try {
    const year = Number(req.params.year);

    if (!Number.isInteger(year)) {
      return res.status(400).json({ message: 'El año debe ser unumero entero' });
    }

    const movies = await Movie.find({ year: { $gte: year } });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar por año', error: error.message });
  }
});

// POST - crear pelicula
router.post('/', async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    if (!title || !director || !year || !genre) {
      return res.status(400).json({
        message: 'title, director, year y genre obligatorios'
      });
    }

    const newMovie = await Movie.create({
      title,
      director,
      year,
      genre
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({
      message: 'No se ha podido crear la pelicula',
      error: error.message
    });
  }
});

// PUT - modificar pelicula
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    const { title, director, year, genre } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year, genre },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'No se ha encontrado la pelicula' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({
      message: 'No se ha podido modificar la pelicula',
      error: error.message
    });
  }
});

// DELETE - eliminar pelicula
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID no es válido' });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'No se ha encontrado la pelicula' });
    }

    res.status(200).json({
      message: 'Pelicula eliminada correctamente',
      movie: deletedMovie
    });
  } catch (error) {
    res.status(500).json({
      message: 'No se ha podido eliminar la pelicula',
      error: error.message
    });
  }
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = router;
