'use strict';

const express = require('express');
const Dog = require('../models/dogs-model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    Dog.find({owner: user._id})
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

router.get('/add-dog', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    res.render('add-dog');
    return;
  }
  res.redirect('/dogs');
});
// })
;

router.post('/add-dog', (req, res, next) => {
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

router.get('/:dogId', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    if (!mongoose.Types.ObjectId.isValid(req.params.dogId)) {
      res.status(404);
      res.render('not-found');
      return;
    }
    const user = req.session.user;
    let shelter = false;

    if (user.role === 'shelter') {
      shelter = true;
    }

    const dogId = req.params.dogId;
    Dog.findById(dogId)
      .then((result) => {
        if (!result) {
          res.status(404);
          res.render('not-found');
          return;
        }

        const requests = result.requests;

        const data = {
          dogs: result,
          shelter: shelter,
          requests: requests
        };
        res.render('dog', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs;');
});

router.get('/:dogId/request/:requestId', (req, res, next) => {
  const dogId = req.params.dogId;
  const requestId = req.params.requestId;
  let requests = null;
  const user = req.session.user;

  if (user.role === 'shelter') {
    Dog.findById(dogId)
      .then((result) => {
        result.requests.find((request) => {
          if (request.id === requestId) {
            const index = result.requests.indexOf(request);
            requests = result.requests[index];
          };
        });

        const data = {
          dogs: result,
          requests: requests
        };
        res.render('view-request', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs');
});

router.post('/:dogId/request/:requestId/', (req, res, next) => {
  const dogId = req.params.dogId;
  const requestId = req.params.requestId;
  const user = req.session.user;

  if (user.role === 'shelter') {
    if (req.body.status === 'reject') {
      Dog.findById(dogId)
        .then((dog) => {
          for (let i = 0; i < dog.requests.length; i++) {
            if (dog.requests[i]._id.equals(requestId)) {
              dog.requests[i].status = 'rejected';
            }
          }
          return dog;
        })
        .then((dog) => {
          dog.save();
          res.redirect(`/mydogs/${dogId}`);
        })
        .catch(next);
      return;
    }
    if (req.body.status === 'accept') {

    }
  }
  res.redirect('/dogs');
});

router.get('/:dogId/edit-dog', (req, res, next) => {
  const dogId = req.params.dogId;

  const user = req.session.user;

  if (user.role === 'shelter') {
    Dog.findById(dogId)
      .then((result) => {
        const data = {
          dogs: result
        };
        res.render('edit-dog', data);
      })
      .catch(next);
    return;
  }
  res.redirect('/dogs');
});

router.post('/:dogId/edit-dog', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    const dogId = req.params.dogId;

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

router.post('/:dogId/delete', (req, res, next) => {
  const user = req.session.user;

  if (user.role === 'shelter') {
    const dogId = req.params.dogId;
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
