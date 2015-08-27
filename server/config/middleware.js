var morgan = require('morgan'); // used for logging incoming requests
var bodyParser = require('body-parser');
var helpers = require('./helper.js'); // my custom middleware


module.exports = function (app, express) {
  // Express 4 allows me to use multiple routers with their own configurations
  // var userRouter = express.Router();
  var flightsRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));


  // app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/flights', flightsRouter);

  // authentication middleware used to decode token and made available on the request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  // require('../models/users/userRoutes.js')(userRouter);
  require('../models/flights/flightsRoutes.js')(flightsRouter);
};