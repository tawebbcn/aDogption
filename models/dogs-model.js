'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = require('../models/users-model');

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  breed_type: {
    type: String,
    enum: ['retriever', 'hunting', 'pastor', 'guard', 'sled', 'working', 'companion', ''],
    default: 'retriever'
  },
  owner: {
    type: ObjectId,
    ref: User
  },
  requests: [{
    owner: {
      type: ObjectId,
      ref: User,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    accepted: {
      type: Boolean,
      required: true
    }
  }]
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
