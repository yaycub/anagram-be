const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  word: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Favorite', schema);
