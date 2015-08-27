var express = require('express');
var path = require('path');
// var mongoose = require('mongoose'); for users
var app = express();

// configure our server with all the middleware and routing
require('./server/config/middleware.js')(app, express);

// If I store users in MongoDB:
// mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/TriviaWithFriends';

// mongoose.connect(mongoURI);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   console.log('db success');
// });

// only run server if app.js was run directly (rather than being imported as a module)
if (!module.parent) {
  var port = process.env.PORT || 3000;

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;


/* Walkthrough of the server
  Express, mongoose, and our server are initialized here.
  We then inject our server and express into our config/middleware.js file for setup.
  We also exported our server for easy testing.
  middleware.js requires all express middleware and sets it up.
  Our authentication is also set up there.

  
  A route file requires its respective controller and sets up all the routes.
  That controller then requires its respective model and sets up all our endpoints, which respond to requests.
*/