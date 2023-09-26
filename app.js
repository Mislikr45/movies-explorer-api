const express = require('express');
const cookies = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerAll = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { PORT } = require('./utils/config');
const { limiter } = require('./middlewares/rateLimiter');

const { DATABASE_URL } = process.env;

const app = express();
app.use(express.json());
app.use(cookies());
app.use(express.json({ extended: true }));
app.use(cors({
  origin: ['https://mislikr45r45.nomoredomainsrocks.ru', 'http://mislikr45r45.nomoredomainsrocks.ru',
    'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
}));

app.use(helmet());
app.disable('x-powered-by');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect(
  DATABASE_URL,
  { useNewUrlParser: true },
);

app.use(requestLogger);
app.use(limiter);
app.use(routerAll);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => { });
