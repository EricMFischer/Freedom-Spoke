var flightsController = require('./flightsController.js');

module.exports = function(app) {
  console.log('Got to flightsRoutes');
  app.post('/', flightsController.getFlights);
  // app.post('/', function(req, res) {
  //   console.log('Req here should be URL', req);
  //   unirest.get("url of api goes here")
  //   .header("Accept", "application/json")
  //   .end(function(result) {
  //     var flightsArr = [];
  //     for(var i = 0; i < result.body.length; i++){
  //       var flightObj = result.body[i];
  //       flightsArr.push(flightObj);
  //     }
  //     res.send(flightsArr);
  //   });
  // });
};