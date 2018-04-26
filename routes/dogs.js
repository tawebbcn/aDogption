'use strict';

const express = require('express');
const Dog = require('../models/dogs-model');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const mailer = require('../helpers/mail');

router.get('/', (req, res, next) => {
  Dog.find({})
    .then((result) => {
      const data = {
        dogs: result
      };
      res.render('dogs', data);
    })
    .catch(next);
});

router.get('/:dogId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.dogId)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  const dogId = req.params.dogId;
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

router.get('/:dogId/request', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.dogId)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  const dogId = req.params.dogId;
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

router.post('/:dogId/request', (req, res, next) => {
  const dogId = req.params.dogId;
  const userId = req.session.user._id;
  const message = req.body.message;
  const status = 'pending';

  const requestInfo = {
    owner: userId,
    message: message,
    status: status
  };

  Dog.findByIdAndUpdate(dogId, {$push: {requests: requestInfo}})
    .populate('owner')
    .then((result) => {
      mailer.newRequest(result.owner.email, message, result.name);
      res.redirect(`/dogs/${dogId}`);
    })
    .catch(next);
});

module.exports = router;
