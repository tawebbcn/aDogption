'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  enum: ['owner', 'shelter'],
  preferences: {
    breed_type: {
      type: String
      // required: true
    },
    age: {
      type: Number
      // required: true
    },
    city: {
      type: String
      // required: true
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
