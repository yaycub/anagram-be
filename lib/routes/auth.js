const { Router } = require('express');
const tokenVerify = require('../middleware/token-verify');
const User = require('../models/User');

module.exports = Router()

  .get('/verify', tokenVerify, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  })

  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          maxAge: 86400000
        });
        res.send(user);
      })
      .catch(next);
  });
