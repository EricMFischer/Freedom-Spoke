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

// // create http request client to consume the QPX API
// var request = require("request")

// // JSON to be passed to the QPX Express API
// var requestData = {
//     "request": {
//         "slice": [
//             {
//                 "origin": "ZRH",
//                 "destination": "DUS",
//                 "date": "2014-12-02"
//             }
//         ],
//         "passengers": {
//             "adultCount": 1,
//             "infantInLapCount": 0,
//             "infantInSeatCount": 0,
//             "childCount": 0,
//             "seniorCount": 0
//         },
//         "solutions": 2,
//         "refundable": false
//     }
// }

// // QPX REST API URL (I censored my api key)
// url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=myApiKey"

// // fire request
// request({
//     url: url,
//     json: true,
//     multipart: {
//         chunked: false,
//         data: [
//             {
//                 'content-type': 'application/json',
//                 body: requestData
//             }
//         ]
//     }
// }, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         console.log(body)
//     }
//     else {

//         console.log("error: " + error)
//         console.log("response.statusCode: " + response.statusCode)
//         console.log("response.statusText: " + response.statusText)
//     }
// })