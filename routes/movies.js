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


router.delete('/movies/:movieId', validateMovieUser, deleteMovie);

module.exports = router;
