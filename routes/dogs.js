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
      res.render('dogs', data);
    });
});

router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  const dogId = req.params.id;
  const user = req.session.user;
  let shelter = false;

  if (user.role === 'shelter') {
    shelter = true;
  }

  Dog.findById(dogId)
    .then((result) => {
      if (!result) {
        res.status(404);
        res.render('not-found');
        return;
      }
      const data = {
        dogs: result,
        user: user,
        shelter: shelter
      };
      res.render('dog', data);
    })
    .catch(next);
});

router.get('/:id/request', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  const dogId = req.params.id;
  const user = req.session.user;

  Dog.findById(dogId)
    .then((result) => {
      if (!result) {
        res.status(404);
        res.render('not-found');
        return;
      }
      const data = {
        dogs: result,
        user: user
      };
      res.render('request', data);
    })
    .catch(next);
});

router.post('/:id/request', (req, res, next) => {
  const dogId = req.params.id;
  const userId = req.session.user._id;
  const message = req.body.message;
  const status = 'pending';

  let requestInfo = {
    owner: userId,
    message: message,
    status: status
  };

  Dog.findByIdAndUpdate(dogId, {$push: {requests: requestInfo}})
    .then((result) => {
      res.redirect(`/dogs/${dogId}`);
    })
    .catch(next);
});

module.exports = router;
