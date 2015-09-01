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
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBkgyeYsv7WDqxULKXvaA8fFCM-BtH0JeM";

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
          res.end();
        } else {
        
          // console.log('Body of succ. request: ', body);
          // console.log('Body.trips.data: ', body.trips.data);
          // console.log('Body.trips.tripOption: ', body.trips.tripOption);

          // STEP 1: GATHER GENERAL FLIGHT INFORMATION
          // stores general information for all flight solutions
          var general = {};
          general.origincode = requestData.request.slice[0].origin;
          general.destinationcode = requestData.request.slice[0].destination;
          for (var i=0; i<trip.city.length; i++) {
            var code = trip.city[i].code;
            if (code === general.origincode) {
              general.origin = trip.city[i].name;
            }
            if (code === general.destinationcode) {
              general.destination = trip.city[i].name;
            }
          }
          for (var i=0; i<trip.airport.length; i++) {
            var code = trip.airport[i].code;
            if (code === general.origincode) {
              general.originairportname = trip.airport[i].name;    
            }
            if (code === general.destinationcode) {
              general.destinationairportname = trip.airport[i].name;
            }
          }
          console.log('General object: ', general);
          




          // STEP 2: GATHER UNIQUE FLIGHT INFORMATION FOR VARIOUS SOLUTIONS

          // stores the unique airlines
          var uniqueAirlines = [];
          for (var i=0; i<trip.carrier.length; i++) {
            var airline = trip.carrier[i].name;
            var airlineCode = trip.carrier[i].code;
            uniqueAirlines.push({airline: airline, airlineCode: airlineCode});
          }
          console.log('uniqueAirlines: ', uniqueAirlines); // array of objects ({NK: Spirit Airlines})



          var options = body.trips.tripOption; // ARRAY OF JOURNEY OPTIONS

          // stores the unique prices
          var uniquePrices = [];
          for (var i=0; i<options.length; i++) {
            var price = options[i].saleTotal;
            uniquePrices.push('$' + price.slice(3, price.length));
          }
          console.log('uniquePrices: ', uniquePrices);



          var uniqueDurations = [];
          var tripSolutions = [];
          for (var i=0; i<2; i++) { // iterating through diff. journey options (2 of them)
            var option = options[i].slice[0];

            uniqueDurations.push(option.duration);

            var journey = [];
            var segments = option.segment; // segments for one journey (segments have multiple legs)
            for (var i=0; i<segments.length; i++) { // iterating through legs for one journey
              var leg = segments[i];
              var legInfoObj = leg.leg[0]; // legInfoObj will be different for each leg, of course

              var legOrigin = legInfoObj.origin;
              var legDestination = legInfoObj.destination;
              var legDuration = legInfoObj.duration;

              var legCarrier = leg.flight.carrier;
              var legFlightNumber = leg.flight.number;
              
              var legDepartureDate = legInfoObj.departureTime.slice(0,10);
              var legDepartureTime = legInfoObj.departureTime.slice(11,16);
              var legArrivalDate = legInfoObj.arrivalTime.slice(0,10);
              var legArrivalTime = legInfoObj.arrivalTime.slice(11,16);

              journey.push(legOrigin, legDestination, legDuration);
              journey.push(legCarrier, legFlightNumber);
              journey.push(legDepartureDate, legDepartureTime, legArrivalDate, legArrivalTime);
            }
            tripSolutions.push(journey);

          }
          console.log('uniqueDurations: ', uniqueDurations);
          console.log('tripSolutions: ', tripSolutions);

          // General object is here:  { origincode: 'LAX',
          //   origin: 'Los Angeles',
          //   originairportname: 'Los Angeles International',
          //   destinationcode: 'PRG',
          //   destination: 'Prague',
          //   destinationairportname: 'Prague Ruzyne' }
          // uniqueAirlines:  [ { airline: 'Norwegian Air Shuttle A.S.', airlineCode: 'DY' },
          //   { airline: 'JSC Aeroflot - Russian Airlines',
          //     airlineCode: 'SU' } ]
          // uniquePrices:  [ '$573.20', '$578.60', '$578.60', '$578.60' ]
          // uniqueDurations:  [ 1105 ]

          // STEP 3: BUILD UP AN ARRAY WITH ALL FLIGHT OBJECTS
          var tripsArr = [];

          for (var i=0; i<4; i++) { // hard-coded # of solutions here too
            var trip = {};
            trip.originCode = general.origincode;
            trip.origin = general.origin;
            trip.originAirportName = general.originairportname;
            trip.destinationCode = general.destinationcode;
            trip.destination = general.destination;
            trip.destinationAirportName = general.destinationairportname;
            trip.price = uniquePrices[i];
            trip.duration = uniqueDurations[i];
            tripsArr.push(trip);
          }

          // tripSolutions:  [ [ 'LAX',
          //     'ARN',
          //     640,
          //     'DY',
          //     '7088',
          //     '2015-10-10',
          //     '18:00',
          //     '2015-10-11',
          //     '13:40',
          //     'ARN',
          //     'OSL',
          //     60,
          //     'DY',
          //     '4119',
          //     '2015-10-11',
          //     '17:30',
          //     '2015-10-11',
          //     '18:30',
          //     'OSL',
          //     'PRG',
          //     120,
          //     'DY',
          //     '1504',
          //     '2015-10-11',
          //     '19:25',
          //     '2015-10-11',
          //     '21:25' ] ]

          // tripSolutions:  [ [ 'EVV',
          //   'ORD',
          //   75,
          //   'UA',
          //   '4610',
          //   '2015-10-10',
          //   '15:35',
          //   '2015-10-10',
          //   '16:50',
          //   'ORD',
          //   'IAH',
          //   164,
          //   'UA',
          //   '262',
          //   '2015-10-10',
          //   '17:40',
          //   '2015-10-10',
          //   '20:24' ] ]

          for (var i=0; i<tripSolutions.length; i++) {
            var tripDetails = tripSolutions[i]; // will have 4 (or whatever) solutions
            var trip = tripsArr[i];

            while (tripDetails.length) {
              var leg = leg || 1;
              trip[leg + 'LegStart'] = tripDetails.shift();
              trip[leg + 'LegEnd'] = tripDetails.shift();
              trip[leg + 'LegDuration'] = tripDetails.shift();
              trip[leg + 'LegCarrier'] = tripDetails.shift();
              trip[leg + 'LegFlightNumber'] = tripDetails.shift();
              trip[leg + 'LegDepartureDate'] = tripDetails.shift();
              trip[leg + 'LegDepartureTime'] = tripDetails.shift();
              trip[leg + 'LegArrivalDate'] = tripDetails.shift();
              trip[leg + 'LegArrivalTime'] = tripDetails.shift();
              leg++;
            }
          }

          // for (var i=0; i<tripSolutions.length; i++) {
          //   var tripDetails = tripSolutions[i]; // will have 4 (or whatever) solutions
          //   var trip = tripsArr[i];
          //   for (var j=0; j<9; j++) {
          //     trip.[i + 'LegStart'] = tripDetails[i*9 +j];
          //     trip.[i + 'LegEnd'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegDuration'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegCarrier'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegFlightNumber'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegDepartureDate'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegDepartureTime'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegArrivalDate'] = tripDetails[i*9 + j];
          //     trip.[i + 'LegArrivalTime'] = tripDetails[i*9 + j];
          //   }
          // }

          // for (var i=0; i<journeySolutions.length; i++) {
          //   var journeyDetails = journeySolutions[i]; // 9 journeyDetails per leg of flight
            // flightsArr[i].1stLegStart = journeyDetails[0];
            // flightsArr[i].1stLegEnd = journeyDetails[1];
            // flightsArr[i].1stLegDuration = journeyDetails[2];
            // flightsArr[i].1stLegCarrier = journeyDetails[3];
            // flightsArr[i].1stLegFlightNumber = journeyDetails[4];
            // flightsArr[i].1stLegDepartureDate = journeyDetails[5];
            // flightsArr[i].1stLegDepartureTime = journeyDetails[6];
            // flightsArr[i].1stLegArrivalDate = journeyDetails[7];
            // flightsArr[i].1stLegArrivalTime = journeyDetails[8];
          //   if (journeyDetails.length > 9) {
          //     flightsArr[i].2ndLegStart = journeyDetails[9];
          //     flightsArr[i].2ndLegEnd = journeyDetails[10];
          //     flightsArr[i].2ndLegDuration = journeyDetails[11];
          //     flightsArr[i].2ndLegCarrier = journeyDetails[12];
          //     flightsArr[i].2ndLegFlightNumber = journeyDetails[13];
          //     flightsArr[i].2ndLegDepartureDate = journeyDetails[14];
          //     flightsArr[i].2ndLegDepartureTime = journeyDetails[15];
          //     flightsArr[i].2ndLegArrivalDate = journeyDetails[16];
          //     flightsArr[i].2ndLegArrivalTime = journeyDetails[17];
          //   }
          // }

        } // need this to not err on else statement
      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
      }
      res.send(tripsArr); // sends tripsArr back to client
    });

  } // ends getFlights func
}