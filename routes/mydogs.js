'use strict';

const express = require('express');
const Dog = require('../models/dogs-model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Dog.find({})
    .then((result) => {
      const data = {
        dogs: result
      };
      res.render('mydogs', data);
    });
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

router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  const dogId = req.params.id;
  Dog.findById(dogId)
    .then((result) => {
      if (!result) {
        res.status(404);
        res.render('not-found');
        return;
      }
      const data = {
        dogs: result
      };
      res.render('dog', data);
    })
    .catch(next);
});

router.get('/:id/edit_dog', (req, res, next) => {
  const dogId = req.params.id;
  Dog.findById(dogId)
    .then((result) => {
      const data = {
        dogs: result
      };
      res.render('edit_dog', data);
    });
});

router.get('/:id/delete', (req, res, next) => {
  const dogId = req.params.id;
  Dog.findByIdAndRemove(dogId)
    .then((result) => {
      res.redirect('/mydogs');
    });
});

module.exports = router;
