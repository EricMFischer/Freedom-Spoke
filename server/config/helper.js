var jwt  = require('jwt-simple'); // lets me authenticate HTTP requests using JWT tokens (protects API endpoint)

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in middleware.js

    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for graceful error handling on app
    res.send(500, {error: error.message});
  },

  decode: function (req, res, next) { // decodes token and will attach said user to the request
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch(error) {
      return next(error);
    }

  }
};