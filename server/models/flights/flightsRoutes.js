var flightsController = require('./flightsController.js');
var unirest = require('unirest');

module.exports = function(app) {
  app.post('/', function(req, res) { // 
    unirest.get("url of api goes here")
    .header("Accept", "application/json")
    .end(function(result) {
      var flightsArr = [];
      for(var i = 0; i < result.body.length; i++){
        var flightObj = result.body[i];
        flightsArr.push(flightObj);
      }
      res.send(flightsArr);
    });
  });
};