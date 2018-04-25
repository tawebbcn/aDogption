'use strict';

const express = require('express');
const Dog = require('../models/dogs-model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    Dog.find({})
      .then((result) => {
        const data = {
          dogs: result
        };
        res.render('mydogs', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs');
});

router.get('/add_dog', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    res.render('add_dog');
    return;
  }
  res.redirect('/dogs');
});
// })
;

router.post('/add_dog', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    const owner = req.session.user._id;
    const dog = new Dog(req.body);
    dog.owner = owner;

    dog.save()
      .then((result) => {
        res.redirect('/mydogs');
      });
    return;
  }
  res.redirect('/dogs');
});

router.get('/:id', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404);
      res.render('not-found');
      return;
    }
    const user = req.session.user;
    let shelter = false;

    if (user.role === 'shelter') {
      shelter = true;
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
          dogs: result,
          shelter: shelter
        };
        res.render('dog', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs;');
});

router.get('/:id/edit_dog', (req, res, next) => {
  const dogId = req.params.id;

  const user = req.session.user;

  if (user.role === 'shelter') {
    Dog.findById(dogId)
      .then((result) => {
        const data = {
          dogs: result
        };
        res.render('edit_dog', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs');
});

router.post('/:id/edit_dog', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
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
    return;
  }
  res.redirect('/dogs');
});

router.post('/:id/delete', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    const dogId = req.params.id;
    Dog.findByIdAndRemove(dogId)
      .then((result) => {
        res.redirect('/mydogs');
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs');
});

module.exports = router;
