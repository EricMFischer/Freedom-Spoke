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
        "solutions": 10,
        "refundable": false
      }
    }

    // QPX REST API URL
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBADz2kTEj7MKBEOa6CTrDuxC6SBK_WH5c";
    
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
      // console.log('body.trips.data: ', body.trips.data);
      if (body.trips === undefined) {res.send('No results available'); return;}
      // console.log('Body of request: ', body.error.errors[0]);
      if (!error && body.trips.data.airport !== undefined && response.statusCode === 200) {
        var trip = body.trips.data;

        // console.log('Body of succ. request: ', body);
        // console.log('Body.trips.data: ', body.trips.data);
        // console.log('Body.trips.tripOption: ', body.trips.tripOption);
        console.log('trip.city: ', trip.city);
        console.log('trip.airport: ', trip.airport);


        // STEP 1: GATHER GENERAL FLIGHT INFORMATION
        // stores general information for all flight solutions
        var general = {};
        general.origincode = requestData.request.slice[0].origin;
        general.destinationcode = requestData.request.slice[0].destination;

        // for general.origin & general.destination
        for (var i=0; i<trip.airport.length; i++) {
          var airportCode = trip.airport[i].code;
          if (airportCode === general.origincode) {
            var originCityCode = trip.airport[i].city;
            general.originairportname = trip.airport[i].name; 

          }
          if (airportCode === general.destinationcode) {
            var destinationCityCode = trip.airport[i].city;
            general.destinationairportname = trip.airport[i].name;
          }
        }
        for (var i=0; i<trip.city.length; i++) {
          var cityCode = trip.city[i].code;
          if (cityCode === originCityCode) {
            general.origin = trip.city[i].name;
          }
          if (cityCode === destinationCityCode) {
            general.destination = trip.city[i].name;
          }
        }

        if (general.destination === undefined || general.origin === undefined) {
          res.send('No results available'); return;
        } // need this check for inputs like NYC that don't correspond to any airport
        

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
          uniquePrices.push(price.slice(3, price.length));
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

        // } // attached to old if-else chain handling errors
      } else {
        console.log("response.statusCode: " + response.statusCode);
        res.send('No results available');
        res.end();
      }
      res.send(tripsArr); // send tripsArr back to client
    });
  } // ends getFlights func
}