var User = require('./userModel.js');
var Q = require('q'); // Node's asynchronous functions do not return promises; they take callbacks. Q makes them return promises
var jwt = require('jwt-simple'); // JWT encodes a string of a small JSON object and hashes it

var secret = 'I kissed your mom';

module.exports = {
  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);
    // check to see if user exists already
    findOne({username: username})
      .then(function(user) {
        console.log('User: ', user);
        // if user exists
        if (user) {
          res.statusCode = 403;
          res.json({error: 'Username taken'});
        } else {
          // make a user
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          console.log('New user created: ', newUser);
          return create(newUser);
        }
      })
      .then(function(user) {
        console.log('got to 2nd then in UC signup');
        // now create token to send back for auth
        var token = jwt.encode(user, secret);
        res.json({token: token});
      })
      .fail(function(error) {
        console.log('Signup error: ', error);
        res.statusCode = 500; // internal server error
        res.json({error: 'Server error'});
      });
  }

}

