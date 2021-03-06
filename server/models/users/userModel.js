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


// Below is middleware that's passed control during execution of asynchronous functions
// this is a pre hook (serial, not parallel)
// serial middleware are executed one after another, when each middleware calls next()

// the hooked method 'save' will not be executed until 'done' is called by each middleware
UserSchema.pre('save', function (next) {
  console.log('got to presave in userModel');
  var user = this;

  // if the password has not been modified (i.e. it's already a stored password), return next()
  if (!user.isModified('password')) {
    return next();
  }

  // otherwise, first generate a salt
  // .genSalt takes # of rounds to process data for, and callback fired once salt is generated
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // now hash the password along with our new salt
    // .hash takes 1) data to be encrypted, 2) salt used to hash the password, 3) a 'progress' callback called during hashing to signify progress, and 4) a callback fired once data is encrypted
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the plain text password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


UserSchema.methods.comparePasswords = function(candidatePassword) {
  var defer = Q.defer(); // returns a 'deferred' object with a promise property and 4 methods resolve(value), reject(reason), notify(value), and makeNodeResolver(). separates promise part from resolver part
  var savedPassword = this.password; // user called fn
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) { // data, encrypted, cb fires once compared (isMatch === true || false)
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch); // waits on passed promise
    }
  });
  console.log('defer: ', defer);
  console.log('defer.promise: ', defer.promise);
  return defer.promise; // resolve and reject methods control the state of promise prop
};

module.exports = mongoose.model('users', UserSchema);
