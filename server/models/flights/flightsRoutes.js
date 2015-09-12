var flightsController = require('./flightsController.js');

module.exports = function(app) {
  app.post('/', flightsController.getFlights);
};