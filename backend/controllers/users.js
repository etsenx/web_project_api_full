const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Get All Users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Register New User
module.exports.createUser = (req, res, next) => {
  const { name, email, password, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPass) =>
      User.create({
        name,
        email,
        password: hashedPass,
        about,
        avatar,
      }),
    )
    .then((user) =>
      res.send({
        data: {
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
          _id: user.id,
        },
      }),
    )
    .catch(next);
};

// Get User by ID
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Get current logged in User
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// Update Profile Detail
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .orFail()
    .then((user) => {
      console.log(user);
      return res.send(user);
    })
    .catch(next);
};

// Update Profile Avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// Login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'secretsecret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
