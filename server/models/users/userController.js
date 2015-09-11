var User = require('./userModel.js');
var Q = require('q'); // Node's asynchronous functions do not return promises; they take callbacks. Q makes them return promises
var jwt = require('jwt-simple'); // JWT encodes a string of a small JSON object and hashes it

var secret = 'super secret';

module.exports = {
  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;
    console.log('username in ctrl: ', username);
    console.log('password in ctrl: ', password);


    var findOne = Q.nbind(User.findOne, User);
    console.log('hitting signup findOne fn');
    // check to see if user exists already
    findOne({username: username})
      .then(function (user) {
        console.log('User in signup: ', user);
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
      .then(function (user) {
        console.log('got to 2nd then in UC signup');
        // now create token to send back for auth
        var token = jwt.encode(user, secret);
        res.json({token: token});
      })
      .fail(function (error) {
        console.log('Signup error: ', error);
        res.statusCode = 500; // internal server error
        res.json({error: 'Server error'});
      });
  },

  signin: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;

    var findUser = Q.nbind(User.findOne, User); // promise-returning function
    console.log('hitting signin findUser fn');
    findUser({username: username})
      .then(function (user) {
        // first deal with potential error
        if (!user) {
          res.statusCode = 403; // forbidden by server
          res.json({error: 'Incorrect username or password'});
        } else {
          user.comparePasswords(password)
            .then(function (foundUser) {
              console.log('foundUser in signin: ', foundUser);
              if (foundUser) {
                var token = jwt.encode(user, secret);
                res.json({token: token});
              } else {
                res.statusCode = 403;
                res.json({error: 'Incorrect username or password'});
              }
            });
        }
      })
      .fail(function (error) {
        res.statusCode = 403;
        res.json({error: 'Incorrect username or password'});
      });
  }

  // checkAuth: function (req, res) {

  // }

}

