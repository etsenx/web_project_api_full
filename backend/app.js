const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
app.use((req, res, next) => {
  req.user = {
    _id: '658cbeff08c1753b17ad8bfa',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.get('*', (req, res) => {
  res.send({ message: 'Sumber daya yang diminta tidak ada' });
});

app.listen(port, () => {
  console.log('Listening on port 3000');
});