const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('')) {
    return next(new AuthorizationError('Необходима авторизация!'));
  }
  // const token = authorization.split('Bearer  ')[1];
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // res.send(token);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = auth;
