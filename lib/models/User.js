require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password){
  this.passwordHash = bcrypt.hashSync(password, 14);
});

schema.statics.authenticate = async function({ email, password }){
  const user = await this.findOne({ email });
  if(!user){
    errorHandler();
  }

  const correctPass = bcrypt.compareSync(password, user.passwordHash);
  if(!correctPass){
    errorHandler();
  }

  return user;
};

schema.methods.authToken = function() {
  return jwt.sign(this.toJSON(), process.env.APP_SECRET || 'A_SECRET', {
    expiresIn: '24h'
  });
};

schema.statics.findByToken = function(token){
  try { 
    const payload = jwt.verify(token, process.env.APP_SECRET || 'A_SECRET');
    return Promise.resolve(this.hydrate({
      _id: payload._id,
      email: payload.email,
      __v: 0
    }));
  }
  catch(err){
    return Promise.reject(err);
  }
};

module.exports = mongoose.model('User', schema);

function errorHandler(){
  const err = new Error('Invalid Email/Password');
  err.status = 403;
  throw err;
}
