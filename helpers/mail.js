'use strict';

const nodemailer = require('nodemailer');

const newRequest = function (email, message, dog) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'doghouse.ironhack@gmail.com',
      pass: 'ir0nH@ck'
    }
  });

  transporter.sendMail({
    from: '"Dog House 👻" <doghouse.ironhack@gmail.com>',
    to: email,
    subject: `You have a new request for ${dog}`,
    text: message,
    html: `<b>${message}</b>` // We need to see how this part works
  })
    .then(info => res.render('message', { email, subject, message, info }))
    .catch(error => console.log(error));
};

const requestStatus = function (email, dog, status) {
  const message = function (status) {
    if (status === 'accepted') {
      return 'Congratulations! Your request was accepted. The shelter will contact you shortly';
    } else if (status === 'rejected') {
      return ' Unfortunately your request has been declined. We\'re sure there is a dog out there perfect for you. ';
    }
  };
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'doghouse.ironhack@gmail.com',
      pass: 'ir0nH@ck'
    }
  });

  transporter.sendMail({
    from: '"Dog House 👻" <doghouse.ironhack@gmail.com>',
    to: email,
    subject: `Your request for ${dog} has been answered`,
    text: message(status),
    html: `<b>${message(status)}</b>` // We need to see how this part works
  })
    .then(info => res.render('message', { email, subject, message, info }))
    .catch(error => console.log(error));
};

module.exports = {newRequest, requestStatus}
;
