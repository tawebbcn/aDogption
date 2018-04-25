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
  const userId = req.session.user._id;

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
        shelter: shelter,
        status: null
      };

      result.requests.find((requests) => {
        if (requests.owner.toString() === userId) {
          const index = result.requests.indexOf(requests);
          data.status = result.requests[index].status.toUpperCase();
        };
      });

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
  const pendingRequest = true;
  const acceptedRequest = false;
  const rejectedRequest = false;

  const requestInfo = {
    owner: userId,
    message: message,
    status: status
  };

  // const data = {
  //   pendingRequest: pendingRequest,
  //   acceptedRequest: acceptedRequest,
  //   rejectedRequest: rejectedRequest
  // };

  Dog.findByIdAndUpdate(dogId, {$push: {requests: requestInfo}})
    .then((result) => {
      res.redirect(`/dogs/${dogId}`, data);
    })
    .catch(next);
});

module.exports = router;
