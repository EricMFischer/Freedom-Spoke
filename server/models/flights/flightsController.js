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
    var requestData = { // reqeustData.request.solutions === 4
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
    }

    // QPX REST API URL
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDuoEYWoXSOt73uaOH9JODD4AyA3lwQ6ks";

    // AIzaSyBkgyeYsv7WDqxULKXvaA8fFCM-BtH0JeM
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
      console.log('Body of succ. request: ', body);
      if (!error && response.statusCode === 200) {
        var trip = body.trips.data;
        // if (!body.trips.tripOption || !trip) { // 1st edge case: flight searches that have no direct flights
        //   res.send('No direct flights available to this location');
        //   res.end();
        // } else {


        // console.log('Body of succ. request: ', body);
        // console.log('Body.trips.data: ', body.trips.data);
        // console.log('Body.trips.tripOption: ', body.trips.tripOption);

        // STEP 1: GATHER GENERAL FLIGHT INFORMATION
        // stores general information for all flight solutions
        var general = {};
        general.origincode = requestData.request.slice[0].origin;
        general.destinationcode = requestData.request.slice[0].destination;
        for (var i=0; i<trip.city.length; i++) {
          var cityCode = trip.city[i].code;
          if (cityCode === general.origincode) {
            general.origin = trip.city[i].name;
          }
          // if (cityCode === general.destinationcode) { // search for LHR has a city code of LON
          //   general.destination = trip.city[i].name;
          // }
        }

        // for general.destination
        for (var i=0; i<trip.airport.length; i++) {
          var airportCode = trip.airport[i].code;
          if (airportCode === general.destinationcode) {
            var cityCode = trip.airport[i].city;
          }
        }
        for (var i=0; i<trip.city.length; i++) {
          if (cityCode === trip.city[i].code) {
            general.destination = trip.city[i].name;
          }
        }

        for (var i=0; i<trip.airport.length; i++) {
          var airportCode = trip.airport[i].code;
          // if (airportCode === general.destinationcode) { // in the event dest. was undefined
          //   general.destination = general.destination || trip.airport[i].name;
          // }
          if (airportCode === general.origincode) {
            general.originairportname = trip.airport[i].name;    
          }
          if (airportCode === general.destinationcode) {
            general.destinationairportname = trip.airport[i].name;
          }
        }
        console.log('trip.city: ', trip.city);
        console.log('trip.airport: ', trip.airport);

        if (general.destinationairportname === undefined) { // when actual destination code (IAH) doesn't match user's inputted destinationcode (HOU)
          for (var i=0; i<trip.city.length; i++) {
            var cityCode = trip.city[i].code;
            if (cityCode === general.destinationcode) {
              general.destinationairportname = trip.city[i].name;
            }
          }
        }
        

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
        // console.log('options[0].slice[0]: ', options[0].slice[0]);
        // stores the unique prices
        var uniquePrices = [];
        for (var i=0; i<requestData.request.solutions; i++) {
          var price = options[i].saleTotal;
          uniquePrices.push('$' + price.slice(3, price.length));
        }
        console.log('uniquePrices: ', uniquePrices);


        var uniqueDurations = [];
        var tripSolutions = [];
        for (var i=0; i<requestData.request.solutions; i++) { // iterating through diff. journey options
          var option = options[i].slice[0];

          uniqueDurations.push(option.duration);

          var journey = [];
          var segments = option.segment; // segments for one journey (segments have multiple legs)
          for (var j=0; j<segments.length; j++) { // iterating through legs for one journey
            var leg = segments[j];
            var legInfoObj = leg.leg[0]; // legInfoObj will be different for each leg

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



        // STEP 3: BUILD UP AN ARRAY WITH ALL FLIGHT OBJECTS
        var tripsArr = [];
        for (var i=0; i<requestData.request.solutions; i++) { // hard-coded # of solutions here too
          var trip = {};
          trip.originCode = general.origincode;
          trip.origin = general.origin;
          trip.originAirportName = general.originairportname;
          trip.destinationCode = general.destinationcode;
          trip.destination = general.destination;
          trip.destinationAirportName = general.destinationairportname;
          trip.price = uniquePrices[i];
          trip.duration = Math.round(uniqueDurations[i] / 60); // changed to hours format
          tripsArr.push(trip);
        }
        // console.log('tripsArr, each w/ diff prices and durations: ', tripsArr);


        for (var i=0; i<tripSolutions.length; i++) {
          var tripDetails = tripSolutions[i]; // will have 4 (or however many) tripSolutions
          var trip = tripsArr[i];

          var legOfTrip = 1;
          while (tripDetails.length) {
            trip['legStart' + legOfTrip] = tripDetails.shift();
            trip['legEnd' + legOfTrip] = tripDetails.shift();
            trip['legDuration' + legOfTrip] = Math.round(tripDetails.shift() / 60);
            trip['legCarrier' + legOfTrip] = tripDetails.shift();
            trip['legFlightNumber' + legOfTrip] = tripDetails.shift();
            trip['legDepartureDate' + legOfTrip] = tripDetails.shift();
            trip['legDepartureTime' + legOfTrip] = tripDetails.shift();
            trip['legArrivalDate' + legOfTrip] = tripDetails.shift();
            trip['legArrivalTime' + legOfTrip] = tripDetails.shift();
            legOfTrip++;
          }
        }
        console.log('tripsArr with specific flight objects: ', tripsArr);

        // } attached to old if-else chain handling errors
      } else {
        console.log("response.statusCode: " + response.statusCode);
        res.send('No results available');
      }
      res.send(tripsArr); // send tripsArr back to client
    });
  } // ends getFlights func
}





// tripsArr AFTER adding specific flight properties:  [ { originCode: 'EVV',
//     origin: 'Evansville',
//     originAirportName: 'Evansville Dress Regional',
//     destinationCode: 'HOU',
//     destination: 'Houston',
//     destinationAirportName: 'Houston William P. Hobby',
//     price: '$317.60',
//     duration: 289,
//     legStart1: 'EVV',
//     legEnd1: 'ORD',
//     legDuration1: 75,
//     legCarrier1: 'UA',
//     legFlightNumber1: '4610',
//     legDepartureDate1: '2015-10-10',
//     legDepartureTime1: '15:35',
//     legArrivalDate1: '2015-10-10',
//     legArrivalTime1: '16:50',
//     legStart2: 'ORD',
//     legEnd2: 'IAH',
//     legDuration2: 164,
//     legCarrier2: 'UA',
//     legFlightNumber2: '262',
//     legDepartureDate2: '2015-10-10',
//     legDepartureTime2: '17:40',
//     legArrivalDate2: '2015-10-10',
//     legArrivalTime2: '20:24' },
//   { originCode: 'EVV',
//     origin: 'Evansville',
//     originAirportName: 'Evansville Dress Regional',
//     destinationCode: 'HOU',
//     destination: 'Houston',
//     destinationAirportName: 'Houston William P. Hobby',
//     price: '$317.60',
//     duration: 290,
//     legStart1: 'EVV',
//     legEnd1: 'DFW',
//     legDuration1: 136,
//     legCarrier1: 'US',
//     legFlightNumber1: '3598',
//     legDepartureDate1: '2015-10-10',
//     legDepartureTime1: '14:04',
//     legArrivalDate1: '2015-10-10',
//     legArrivalTime1: '16:20',
//     legStart2: 'DFW',
//     legEnd2: 'HOU',
//     legDuration2: 69,
//     legCarrier2: 'US',
//     legFlightNumber2: '5785',
//     legDepartureDate2: '2015-10-10',
//     legDepartureTime2: '17:45',
//     legArrivalDate2: '2015-10-10',
//     legArrivalTime2: '18:54' },
//   { originCode: 'EVV',
//     origin: 'Evansville',
//     originAirportName: 'Evansville Dress Regional',
//     destinationCode: 'HOU',
//     destination: 'Houston',
//     destinationAirportName: 'Houston William P. Hobby',
//     price: '$317.60',
//     duration: 285,
//     legStart1: 'EVV',
//     legEnd1: 'ORD',
//     legDuration1: 75,
//     legCarrier1: 'UA',
//     legFlightNumber1: '4642',
//     legDepartureDate1: '2015-10-10',
//     legDepartureTime1: '10:24',
//     legArrivalDate1: '2015-10-10',
//     legArrivalTime1: '11:39',
//     legStart2: 'ORD',
//     legEnd2: 'IAH',
//     legDuration2: 169,
//     legCarrier2: 'UA',
//     legFlightNumber2: '436',
//     legDepartureDate2: '2015-10-10',
//     legDepartureTime2: '12:20',
//     legArrivalDate2: '2015-10-10',
//     legArrivalTime2: '15:09' },
//   { originCode: 'EVV',
//     origin: 'Evansville',
//     originAirportName: 'Evansville Dress Regional',
//     destinationCode: 'HOU',
//     destination: 'Houston',
//     destinationAirportName: 'Houston William P. Hobby',
//     price: '$317.60',
//     duration: 278,
//     legStart1: 'EVV',
//     legEnd1: 'DFW',
//     legDuration1: 136,
//     legCarrier1: 'US',
//     legFlightNumber1: '3598',
//     legDepartureDate1: '2015-10-10',
//     legDepartureTime1: '14:04',
//     legArrivalDate1: '2015-10-10',
//     legArrivalTime1: '16:20',
//     legStart2: 'DFW',
//     legEnd2: 'IAH',
//     legDuration2: 72,
//     legCarrier2: 'US',
//     legFlightNumber2: '2326',
//     legDepartureDate2: '2015-10-10',
//     legDepartureTime2: '17:30',
//     legArrivalDate2: '2015-10-10',
//     legArrivalTime2: '18:42' } ]

// from, to, when:  EVV HOU 2015-10-10
// General object:  { origincode: 'EVV',
//   destinationcode: 'HOU',
//   origin: 'Evansville',
//   destination: 'Houston',
//   originairportname: 'Evansville Dress Regional',
//   destinationairportname: 'Houston William P. Hobby' }
// uniqueAirlines:  [ { airline: 'United Airlines, Inc.', airlineCode: 'UA' },
//   { airline: 'US Airways, Inc.', airlineCode: 'US' } ]
// uniquePrices:  [ '$317.60', '$317.60', '$317.60', '$317.60' ]
// uniqueDurations:  [ 289, 290, 285, 278 ]
// tripSolutions:  [ [ 'EVV',
//     'ORD',
//     75,
//     'UA',
//     '4610',
//     '2015-10-10',
//     '15:35',
//     '2015-10-10',
//     '16:50',
//     'ORD',
//     'IAH',
//     164,
//     'UA',
//     '262',
//     '2015-10-10',
//     '17:40',
//     '2015-10-10',
//     '20:24' ],
//   [ 'EVV',
//     'DFW',
//     136,
//     'US',
//     '3598',
//     '2015-10-10',
//     '14:04',
//     '2015-10-10',
//     '16:20',
//     'DFW',
//     'HOU',
//     69,
//     'US',
//     '5785',
//     '2015-10-10',
//     '17:45',
//     '2015-10-10',
//     '18:54' ],
//   [ 'EVV',
//     'ORD',
//     75,
//     'UA',
//     '4642',
//     '2015-10-10',
//     '10:24',
//     '2015-10-10',
//     '11:39',
//     'ORD',
//     'IAH',
//     169,
//     'UA',
//     '436',
//     '2015-10-10',
//     '12:20',
//     '2015-10-10',
//     '15:09' ],
//   [ 'EVV',
//     'DFW',
//     136,
//     'US',
//     '3598',
//     '2015-10-10',
//     '14:04',
//     '2015-10-10',
//     '16:20',
//     'DFW',
//     'IAH',
//     72,
//     'US',
//     '2326',
//     '2015-10-10',
//     '17:30',
//     '2015-10-10',
//     '18:42' ] ]