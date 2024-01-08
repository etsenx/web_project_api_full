/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-unary-ops */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https:\/\/|http:\/\/)(www\.)?.+/g.test(v);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
