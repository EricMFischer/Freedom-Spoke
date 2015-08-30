var Flights = require('./flightsModel');
var Q = require('q');
var request = require('request'); // creates http req client to consume the QPX API

module.exports = {
  getFlights: function(req, res) {
    var from = req.body.from;
    var to = req.body.to;
    var when = req.body.when; // all strings
    console.log('from, to, when: ', from, to, when);

    // JSON that will be passed to the QPX API
    var requestData = {
      "request": {
        "slice": [
          {
            "origin": from,
            "destination": to,
            "date": when
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 4,
        "refundable": false
      }
    } // ends var requestData

    // QPX REST API URL
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCukf1n7N2XpJWKZNLrEy5KrwwJRzRjZho";
    // AIzaSyCukf1n7N2XpJWKZNLrEy5KrwwJRzRjZho (new key)
    // "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCVf09V6vrXCODC-t4-jwRZpuW2YFg181M"; (previous key)

    // fires request
    request({
      url: url,
      method: "POST",
      json: true, // json: true does 2 things: JSON.stringify() body and JSON.parse() response
      headers: {
        "content-type": "application/json",
      },
      body: requestData // don't need to JSON.stringify here
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var trip = body.trips.data; // to deal with data easier

        if (!body.trips.tripOption || !trip) { // 1st edge case: flight searches that have no direct flights
          res.send('No direct flights available to this location');
          res.end(); // appropriate?
        } else {
        
        // console.log('Body of succ. request: ', body);
        // console.log('Body.trips.data: ', body.trips.data);
        // console.log('Body.trips.tripOption: ', body.trips.tripOption);

        // STEP 1: GATHER GENERAL FLIGHT INFORMATION

        // stores general information for all flight solutions
        var general = {};

        general.origincode = requestData.request.slice[0].origin;
        // general.origin = trip.city[0].name;
        for (var i=0; i<trip.city.length; i++) {
          var code = trip.city[i].code;
          if (code === general.origincode) {
            general.origin = trip.city[i].name;

          }
        }
        for (var i=0; i<trip.airport.length; i++) {
          var code = trip.airport[i].code;
          if (code === general.origincode) {
            general.originairportname = trip.airport[i].name;
            
          }
        }

        general.destinationcode = requestData.request.slice[0].destination;
        for (var i=0; i<trip.city.length; i++) {
          var code = trip.city[i].code;
          if (code === general.destinationcode) {
            general.destination = trip.city[i].name;
          }
        }
        for (var i=0; i<trip.airport.length; i++) {
          var code = trip.airport[i].code;
          if (code === general.destinationcode) {
            general.destinationairportname = trip.airport[i].name;
          }
        }
        // general.destinationairportname = trip.airport[trip.airport.length - 1].name;
        console.log('General object is here: ', general);
        



        // STEP 2: GATHER UNIQUE FLIGHT INFORMATION FOR VARIOUS SOLUTIONS
        
        // stores the unique airlines
        var uniqueAirlines = [];
        for (var i=0; i<trip.carrier.length; i++) {
          var airline = trip.carrier[i].name;
          var airlineCode = trip.carrier[i].code;
          uniqueAirlines.push({airline: airline, airlineCode: airlineCode});
        }
        console.log('uniqueAirlines: ', uniqueAirlines); // array of objects ({NK: Spirit Airlines})

        var options = body.trips.tripOption; // an array of unique flight information
        // stores the unique prices
        var uniquePrices = [];
        for (var i=0; i<options.length; i++) {
          var price = options[i].saleTotal;
          uniquePrices.push('$' + price.slice(3, price.length));
        }
        console.log('uniquePrices: ', uniquePrices);

        var sliceArr = [];
        var pricingArr = [];
        for (var i=0; i<options.length; i++) {
          var slice = options[i].slice[0];
          var pricing = options[i].pricing[0];
          sliceArr.push(slice);
          pricingArr.push(pricing);
        }
        // console.log('sliceArr is here: ', sliceArr);
        // console.log('pricingArr is here: ', pricingArr);

        // stores the unique flightTimes
        var uniqueFlightTimes = [];
        for (var i=0; i<sliceArr.length; i++) {
          var flightTime = sliceArr[i].duration;
          uniqueFlightTimes.push(flightTime);
        }
        console.log('uniqueFlightTimes: ', uniqueFlightTimes);

        // segments unique to each flight
        var uniqueSegments = [];
        for (var i=0; i<sliceArr.length; i++) {
          var segment = sliceArr[i].segment[0];
          uniqueSegments.push(segment);
        }
        // console.log('uniqueSegments: ', uniqueSegments);

        var airlineCodeArr = [];
        var flightNumArr = [];
        var legArr = [];
        for (var i=0; i<uniqueSegments.length; i++) {
          var flight = uniqueSegments[i].flight.carrier;
          var flightNum = uniqueSegments[i].flight.number;
          var leg = uniqueSegments[i].leg[0];

          airlineCodeArr.push(flight);
          flightNumArr.push(flightNum);
          legArr.push(leg);
        }
        console.log('airlineCodeArr is here: ', airlineCodeArr);
        console.log('flightNumArr is here: ', flightNumArr);
        // console.log('legArr is here: ', legArr);
        
        var departureDates = [];
        var departureTimes = [];
        var arrivalDates = [];
        var arrivalTimes = [];

        for (var i=0; i<legArr.length; i++) {
          var departure = legArr[i].departureTime;
          var arrival = legArr[i].arrivalTime;

          var departureDate = departure.slice(0,10);
          var departureTime = departure.slice(11,16);
          var arrivalDate = arrival.slice(0,10);
          var arrivalTime = arrival.slice(11,16);
          
          departureDates.push(departureDate);
          departureTimes.push(departureTime);
          arrivalDates.push(arrivalDate);
          arrivalTimes.push(arrivalTime);
        }

        console.log('Departure dates: ', departureDates);
        console.log('Departure times: ', departureTimes);
        console.log('Arrival dates: ', arrivalDates);
        console.log('Arrival times: ', arrivalTimes);

        // WHAT ABOUT LINKS?

// General object is here:  { origincode: 'LAX',
//   origin: 'Los Angeles',
//   originairportname: 'Los Angeles International',
//   destinationcode: 'SEA',
//   destination: 'Seattle',
//   destinationairportname: 'Seattle/Tacoma Sea/Tac' }

// uniqueAirlines:  [ { airline: 'Alaska Airlines Inc.', airlineCode: 'AS' },
//   { airline: 'Virgin America Inc.', airlineCode: 'VX' } ]

// uniquePrices:  [ '$88.10', '$88.10', '$88.10', '$88.10' ]
// uniqueFlightTimes:  [ 160, 160, 160, 160 ]

// airlineCodeArr is here:  [ 'AS', 'VX', 'AS', 'AS' ]
// flightNumArr is here:  [ '447', '781', '461', '479' ]
// Departure dates:  [ '2015-10-10', '2015-10-10', '2015-10-10', '2015-10-10' ]
// Departure times:  [ '13:45', '10:00', '18:25', '16:30' ]
// Arrival dates:  [ '2015-10-10', '2015-10-10', '2015-10-10', '2015-10-10' ]
// Arrival times:  [ '16:25', '12:40', '21:05', '19:10' ]
      
        // STEP 3: BUILD MASSIVE RESPONSE ARRAY WITH ALL SOLUTION FLIGHTS
        var resultsArr = [];

        }

// WITH 2 SOLUTIONS:
//   carrier: 
   // [ { kind: 'qpxexpress#carrierData',
   //     code: 'AS',
   //     name: 'Alaska Airlines Inc.' },
   //   { kind: 'qpxexpress#carrierData',
   //     code: 'F9',
   //     name: 'Frontier Airlines, Inc.' },
   //   { kind: 'qpxexpress#carrierData',
   //     code: 'NK',
   //     name: 'Spirit Airlines' } ]

// Body.trips.tripOption:  [ { kind: 'qpxexpress#tripOption',
//     saleTotal: 'USD168.10',
//     id: 'IdpaBvGHBBFS07JpWi1uEN002',
//     slice: [ [Object] ],
//     pricing: [ [Object] ] },

//   { kind: 'qpxexpress#tripOption',
//     saleTotal: 'USD168.10',
//     id: 'IdpaBvGHBBFS07JpWi1uEN001',
//     slice: [ [Object] ],
//     pricing: [ [Object] ] } ]

      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
      }
      res.send(general); // sends resultsArr back to client
    });

    // console.log('flightsArr here: ', flightsArr);

  } // ends getFlights function




  // Build an addFlights function here!!! (name change)
  // addQuestion: function(result){
  //   var questions = [];
  //   var cleanAnswer = function(answer) {
  //     return answer.replace(/<\/?i>/g, '');
  //   };
  //   for(var i = 0; i < result.body.length; i++){
  //     var answer = cleanAnswer(result.body[i].answer);
  //     questions.push({
  //       id: result.body[i].id,
  //       question: result.body[i].question,
  //       answer: answer
  //     });
  //   }
  //   Trivia.collection.insert(questions, function(){
  //     //null
  //   });
  // }
}