'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const bcryptSalt = 10;

const router = express.Router();

// ----------------GET sign up page------------//
router.get('/signup', (req, res, next) => {
  if (req.session.user) {
    const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
    res.redirect(redirectTo);
    return;
  }
  const data = {
    errorMessage: req.flash('signup-error')
  };
  res.render('signup', data);
});

// ----------------POST sign up page------------//
router.post('/signup', (req, res, next) => {
  if (req.session.user) {
    const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
    res.redirect(redirectTo);
    return;
  }

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  if (!email || !password || !username) {
    req.flash('signup-error', 'Please fill in all the fields.');
    res.redirect('/auth/signup');
  }

  User.findOne({'email': email})
    .then((result) => {
      if (result) {
        req.flash('signup-error', 'This email is taken. Try logging in');
        res.redirect('/auth/signup');
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const user = new User({
        email,
        username,
        password: hashPass,
        role
      });

      user.save()
        .then((result) => {
          req.session.user = result;
          const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
          res.redirect(redirectTo);
        });
    })
    .catch(next);
});

// ----------------GET login page------------//

router.get('/login', (req, res, next) => {
  if (req.session.user) {
    const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
    res.redirect(redirectTo);
    return;
  }

  const data = {
    errorMessage: req.flash('login-error')
  };
  res.render('login', data);
});

// ----------------POST login page------------//

router.post('/login', (req, res, next) => {
  if (req.session.user) {
    const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
    res.redirect(redirectTo);
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    req.flash('login-error', 'Indicate a username and a password to log in');
    res.redirect('/auth/login');
    return;
  }

  User.findOne({'email': email})
    .then((result) => {
      if (!result) {
        req.flash('login-error', 'Wrong username');
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(password, result.password)) {
        req.flash('login-error', 'Wrong password');
        res.redirect('/auth/login');
        return;
      }

      req.session.user = result;
      const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
      res.redirect(redirectTo);
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect('/');
});

module.exports = router;
