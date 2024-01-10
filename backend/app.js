const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required(),
      password: Joi.string().required(),
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

app.listen(port, () => {
  console.log('Listening on port 3001');
});
