'use strict';

const express = require('express');
const Dog = require('../models/dogs-model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  res.render('mydogs');
});

router.get('/add_dog', (req, res, next) => {
  // Dog.find({})
  //   .then((result) => {
  //     const data = {
  //       dogs: result
  //     };
  res.render('add_dog' /* data */);
});
// })
;

router.post('/add_dog', (req, res, next) => {
  const dog = new Dog(req.body);
  dog.save()
    .then((result) => {
      res.redirect('/mydogs');
    });
});

module.exports = router;
