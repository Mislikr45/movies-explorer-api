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
const limiter = require('./middlewares/rateLimiter');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cookies());
app.use(express.json({ extended: true }));
app.use(cors({
  origin: ['https://mislikr45.nomoreparties.co', 'http://mislikr45.nomoreparties.co',
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
  'mongodb://0.0.0.0:27017/bitfilmsdb',
  { useNewUrlParser: true },
);

app.use(requestLogger);

app.use(routerAll);
app.use(limiter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => { });
