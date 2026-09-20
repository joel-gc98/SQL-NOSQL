const express = require('express');
const { connect } = require('./utils/db');

const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');

const PORT = 3000;
const server = express();

server.use(express.json());

connect();

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de peliculas funcionando correctamente'
  });
});

server.use('/movies', movieRoutes);
server.use('/cinemas', cinemaRoutes);

server.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
