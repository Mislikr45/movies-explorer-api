const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 110,
  windowMS: 30000,
  message: 'Превышенно кол-во подключений',
});

module.exports = limiter;
