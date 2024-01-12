const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
const app = express();

const corsOption = {
  origin: ['http://localhost:3006', 'https://etsenx.t-hp.com', 'https://around.trunk.so', 'https://www.around.trunk.so'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BASE_URL = process.env.BASE_PATH || 3000;

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server akan crash saat ini');
  }, 0);
}); 

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  createUser,
);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.get('*', (req, res) => {
  res.send({ message: 'Sumber daya yang diminta tidak ada' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Terjadi kesalahan pada server' : message,
  });
});

app.listen(BASE_URL, () => {
  console.log('Listening on port 3000');
  // console.log(BASE_PATH);
});
