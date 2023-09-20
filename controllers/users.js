const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// 400
const BadRequestError = require('../errors/BadRequestError');
// 404
const NotFoundError = require('../errors/NotFoundError');
// 500
const DefaultErore = require('../errors/DefaultErore');
// 409
const EmailErrors = require('../errors/EmailErrors');
// 401
const AuthorizationError = require('../errors/AuthorizationError');

const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  AUTHORIZATION_ERROR,
  DEFAULT_ERROR,
  EMAIL_ERROR,
  ERROR_CODE_UNIQUE,
  STATUS_201,
  STATUS_200,
} = require('../utils/constants');

// Логирование
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(STATUS_201).send({ jwt: token });
    })
    .catch(() => next(new AuthorizationError(
      AUTHORIZATION_ERROR,
    )));
};

module.exports.delCookie = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

// Информация о пользователе
module.exports.getUser = (req, res, next) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          NOT_FOUND_ERROR,
        ));
      } else {
        res.status(STATUS_200).send(user);
      }
    }).catch(() => next(new DefaultErore(
      DEFAULT_ERROR,
    )));
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((usernew) => res.status(STATUS_201).send({
      _id: usernew._id,
      email: usernew.email,
      name: usernew.name,
    }))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new EmailErrors(EMAIL_ERROR));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

// Изменение информации о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { email, name },
    { new: true, runValidators: true },
  ).then((user) => {
    if (user) return res.status(STATUS_201).send(user);
    throw new NotFoundError(NOT_FOUND_ERROR);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
        if (err.name === 'CastError') next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
