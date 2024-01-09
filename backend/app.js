const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { celebrate, Joi } = require('celebrate');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middleware/auth.js');

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
  })
}), createUser);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '658cbeff08c1753b17ad8bfa',
//   };

//   next();
// });

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.get('*', (req, res) => {
  res.send({ message: 'Sumber daya yang diminta tidak ada' });
});

app.listen(port, () => {
  console.log('Listening on port 3001');
});
