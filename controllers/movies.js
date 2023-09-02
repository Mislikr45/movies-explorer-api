const Movie = require('../models/movie');

// 400
const BadRequestError = require('../errors/BadRequestError');
// 404
const NotFoundError = require('../errors/NotFoundError');
// 403
const AcessError = require('../errors/AcessError');

const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  ACESS_ERROR,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).then((movies) => res.send(movies)).catch((error) => next(error));
};

module.exports.createMovie = (req, res, next) => {
  const id = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: id,
  })
    .then((movie) => res.status(201).send(movie)) // ОК
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError(
            BAD_REQUEST_ERROR,
          ),
        );
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(NOT_FOUND_ERROR));
      } return movie;
    }).then((movie) => {
      const id = req.user._id;
      if (String(movie.owner) !== String(id)) {
        next(new AcessError(
          ACESS_ERROR,
        ));
      } else {
        Movie.findByIdAndRemove(movieId).then((movies) => { res.send({ data: movies }); })
          .catch((err) => { next(err); });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
