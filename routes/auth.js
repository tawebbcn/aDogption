'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const bcryptSalt = 10;

const router = express.Router();

// ----------------GET sign up page------------//
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// ----------------POST sign up page------------//
router.post('/signup', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  if (!email || !password) {
    res.redirect('/auth/signup');
  }

  User.findOne({'email': email})
    .then((result) => {
      if (!result) {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const user = new User({
          email,
          password: hashPass,
          role
        });

        user.save()
          .then(() => {
            // if (shelter) {
            //   res.redirect('/mydogs/add_dog');
            // } else {
            res.redirect('/dogs');
            // }
          });
        return;
      }
      req.flash('signup-error', 'This email is taken. Try logging in');
      res.redirect('/auth/signup');
    });
});

// ----------------GET login page------------//
router.get('/login', function (req, res, next) {
  res.render('login');
});

module.exports = router;
