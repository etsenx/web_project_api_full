const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get All Users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Register New User
module.exports.createUser = (req, res) => {
  const { name, email, password, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPass) => {
      return User.create({
        name,
        email,
        password: hashedPass,
        about,
        avatar,
      });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
        // res.status(400).send({ message: "Invalid Data" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Get User by ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "User Not Found" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Get current logged in User
module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
  .then((user) => res.send({ data: user }))
}

// Update Profile Detail
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid Data" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Update Profile Avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid Data" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Login
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
    res.send({
      token: jwt.sign({ _id: user._id }, 'secretsecret', { expiresIn: '7d' }),
    });
  })
    .catch((err) => {
    res.status(401).send({ message: err.message });
  });
};
