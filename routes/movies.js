const router = require('express').Router();
const {
  validateCreateMovie,
  validateMovieUser,
} = require('../utils/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// все фильмы пользователя
router.get('/movies', getMovies);

// создает фильм
router.post('/movies', validateCreateMovie, createMovie);

// удаляет фильм
router.delete(
  '/movies/_id',
  validateMovieUser,
  deleteMovie,
);

module.exports = router;
