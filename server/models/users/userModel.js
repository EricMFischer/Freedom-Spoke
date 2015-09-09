var mongoose = require('mongoose'); // Mongoose is a Node.js library that provides MongoDB object mapping similar to an ORM. It translates data in  database to usable JavaScript objects
var bcrypt = require('bcrypt-nodejs'); // a key derivation hashing algorithm for encrypting passwords
var Q = require('q'); // Node's asynchronous functions do not return promises; they take callbacks. Q makes them return promises
var SALT_WORK_FACTOR = 10; // hashes password 2^10 times

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
});

// middleware that's passed control during execution of asynchronous functions
// this a pre hook (serial, not parallel)
// serial middleware are executed one after another, when each middleware calls next

// the hooked method 'save' will not be executed until 'done' is called by each middleware
UserSchema.pre('save', function (next) {
  var user = this;

  // if the password has not been modified (i.e. it's already a stored password), return next()
  if (!user.isModified('password')) {
    return next();
  }

  // otherwise, first generate a salt
  
})

module.exports = mongoose.model('users', UserSchema);