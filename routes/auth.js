'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const bcryptSalt = 10;

const router = express.Router();

// ----------------GET sign up page------------//
router.get('/signup', (req, res, next) => {
  if (req.session.role === 'shelter') {
    res.redirect('/mydogs');
    return;
  }
  if (req.session.role === 'owner') {
    res.redirect('/dogs');
    return;
  }
  const data = {
    errorMessage: req.flash('signup-error')
  };
  res.render('signup', data);
});

// ----------------POST sign up page------------//
router.post('/signup', (req, res, next) => {
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
          .then((result) => {
            req.session.user = true;
            req.session.role = result.role;
            if (role === 'shelter') {
              res.redirect('/mydogs/add_dog');
            } else {
              res.redirect('/dogs');
            }
          });
        return;
      }
      req.flash('signup-error', 'This email is taken. Try logging in');
      res.redirect('/auth/signup');
    })
    .catch(next);
});

// ----------------GET login page------------//

router.get('/login', (req, res, next) => {
  if (req.session.role === 'shelter') {
    res.redirect('/mydogs');
    return;
  }
  if (req.session.role === 'owner') {
    res.redirect('/dogs');
    return;
  }
  const data = {
    errorMessage: req.flash('login-error')
  };
  res.render('login', data);
});

// ----------------POST login page------------//

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    req.flash('login-error', 'Indicate a username and a password to log in');
    res.redirect('/auth/login');
    return;
  }

  User.findOne({'email': email})
    .then((result) => {
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          req.session.user = true;
          req.session.role = result.role;
          if (req.session.role === 'shelter') {
            res.redirect('/mydogs');
          } else {
            res.redirect('/dogs');
          }
        }
        req.flash('login-error', 'Wrong password');
        res.redirect('/auth/login');
        return;
      }
      req.flash('login-error', 'Wrong username');
      res.redirect('/auth/login');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.user = false;
    req.session.role = null;
    res.redirect('/');
    return;
  }
  res.redirect('/');
});

module.exports = router;
