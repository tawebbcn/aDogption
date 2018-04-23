'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.user) {
    const redirectTo = req.session.user.role === 'shelter' ? '/mydogs' : '/dogs';
    res.redirect(redirectTo);
    return;
  }
  res.render('index');
});

module.exports = router;
