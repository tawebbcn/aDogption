'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.role === 'shelter') {
    res.redirect('/mydogs');
    return;
  }
  if (req.session.role === 'owner') {
    res.redirect('/dogs');
  }
  res.render('index');
});

module.exports = router;
