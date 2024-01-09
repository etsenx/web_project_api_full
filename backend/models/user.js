/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-unary-ops */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isEmail(v)
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    default: 'Explorer',
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    required: true, 
    validate: {
      validator(v) {
        return /(https:\/\/|http:\/\/)(www\.)?.+/g.test(v);
      },
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Email atau sandi salah'));
    }

    return bcrypt.compare(password, user.password)
      .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Email atau sandi salah'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
