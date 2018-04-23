'use strict';

// -----------------Routes------------ //
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// --------------------Set up routes--------------//

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

// ---------------view engine setup------------ //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/spots', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// OR when using provess.env to get ready for deploy

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -------------------Middlewares--------------- //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------Call the routes------------ //

app.use('/', indexRouter);
app.use('/auth', authRouter);

// ---------------Catch 404 and forward to error handler------------ //

// NOTE: requires a views/not-found template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
