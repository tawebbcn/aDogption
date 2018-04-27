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
  picture: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  age: {
    type: String,
    enum: ['puppy', 'adult', 'senior'],
    required: true
  },
  breed_type: {
    type: String,
    enum: ['retriever', 'pastor', 'guard', 'sled', 'working', 'companion', 'bulldog', 'pitbull', 'terrier', 'hound', 'pointer', 'setter', 'collie', 'shepherd', 'huskie', 'not-defined'],
    default: 'retriever'
  },
  description: {
    type: String,
    required: false
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  requests: [{
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      required: false
    }
  }]
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
