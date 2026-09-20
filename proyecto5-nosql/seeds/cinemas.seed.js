const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/proyecto-basico-express-movies');

    const movies = await Movie.find();

    const findMovie = (title) => movies.find(movie => movie.title === title)?._id;

    await Cinema.deleteMany({});

    const cinemas = [
      {
        name: 'Cines Plaza',
        city: 'Madrid',
        address: 'Calle Gran Vía, 25',
        movies: [
          findMovie('The Matrix'),
          findMovie('Interestelar'),
          findMovie('Buscando a Dory')
        ].filter(Boolean)
      },
      {
        name: 'Cine Centro',
        city: 'Madrid',
        address: 'Calle Alcalá, 80',
        movies: [
          findMovie('The Matrix Reloaded'),
          findMovie('Buscando a Nemo'),
          findMovie('50 primeras citas')
        ].filter(Boolean)
      },
      {
        name: 'Cines Norte',
        city: 'Alcobendas',
        address: 'Avenida de España, 12',
        movies: [
          findMovie('Interestelar'),
          findMovie('The Matrix'),
          findMovie('Buscando a Nemo')
        ].filter(Boolean)
      }
    ];

    await Cinema.insertMany(cinemas);

    console.log('Cines cargados correctamente');
  } catch (error) {
    console.error('Error al crear los cines:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
