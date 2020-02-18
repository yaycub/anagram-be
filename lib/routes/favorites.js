const { Router } = require('express');
const Favorites = require('../models/Favorites');
const tokenVerify = require('../middleware/token-verify');

module.exports = Router()

  .get('/', tokenVerify, (req, res, next) => {
    const id = req.user._id;
    
    Favorites
      .find({ userId: id })
      .then(favorites => res.send(favorites))
      .catch(next);
  })

  .post('/', tokenVerify, (req, res, next) => {
    const id = req.user._id;

    Favorites
      .create({ userId: id, ...req.body })
      .then(favorite => res.send(favorite))
      .catch(next);
  });
