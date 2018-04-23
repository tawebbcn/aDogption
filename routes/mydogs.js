'use strict';

const express = require('express');

const router = express.Router();

router.get('/mydogs', (req, res, next) => {
  res.render('mydogs');
});

router.get('/mydogs/add_dog', (req, res, next) => {
  res.render('add_dog');
})
;
