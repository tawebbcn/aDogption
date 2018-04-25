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
    })
    .catch(next);
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
  const owner = req.session.user._id;
  const dog = new Dog(req.body);
  dog.owner = owner;

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
    })
    .catch(next);
});

router.post('/:id/edit_dog', (req, res, next) => {
  const dogId = req.params.id;
  const dog = {
    name: req.body.name,
    breed_type: req.body.breed_type,
    age: req.body.age,
    description: req.body.message
  };

  Dog.findByIdAndUpdate(dogId, { $set: {
    name: dog.name,
    breed_type: dog.breed_type,
    age: dog.age,
    description: dog.description}
  })
    .then((result) => {
      res.redirect(`/mydogs/${dogId}`);
    })
    .catch(next);
});

router.get('/:id/delete', (req, res, next) => {
  const dogId = req.params.id;
  Dog.findByIdAndRemove(dogId)
    .then((result) => {
      res.redirect('/mydogs');
    })
    .catch(next);
});

module.exports = router;
