const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción'
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción'
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación'
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación'
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción'
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica'
  }
];

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/proyecto-basico-express-movies');

    await Movie.deleteMany({});
    await Movie.insertMany(movies);

    console.log('Peliculas cargadas correctamente');
  } catch (error) {
    console.error('Error al crear las peliculas:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
