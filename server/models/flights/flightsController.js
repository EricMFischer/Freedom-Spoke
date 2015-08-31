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
          res.end();
          return;
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


        // stores the unique flightTimes
        var uniqueDurations = [];
        for (var i=0; i<sliceArr.length; i++) {
          var flightTime = sliceArr[i].duration;
          uniqueDurations.push(flightTime);
        }
        console.log('uniqueDurations: ', uniqueDurations);


        // segment arrays unique to each flight
        var uniqueSegments = []; // an array of array segments
        for (var i=0; i<sliceArr.length; i++) {
          var segments = sliceArr[i].segment;
          uniqueSegments.push(segments);
        }
        console.log('uniqueSegments: ', uniqueSegments);




// uniqueSegments:  [ [ { kind: 'qpxexpress#segmentInfo',
//       duration: 75,
//       flight: [Object],
//       id: 'GMw3yfMvSr-mSHFj',
//       cabin: 'COACH',
//       bookingCode: 'H',
//       bookingCodeCount: 9,
//       marriedSegmentGroup: '0',
//       leg: [Object],
//       connectionDuration: 50 },
//     { kind: 'qpxexpress#segmentInfo',
//       duration: 164,
//       flight: [Object],
//       id: 'GR0pel6XxdPA1qTE',
//       cabin: 'COACH',
//       bookingCode: 'H',
//       bookingCodeCount: 9,
//       marriedSegmentGroup: '0',
//       leg: [Object] } ],
//   [ { kind: 'qpxexpress#segmentInfo',
//       duration: 136,
//       flight: [Object],
//       id: 'GB7F7LJCuDPTRs6X',
//       cabin: 'COACH',
//       bookingCode: 'M',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object],
//       connectionDuration: 85 },
//     { kind: 'qpxexpress#segmentInfo',
//       duration: 69,
//       flight: [Object],
//       id: 'GKRr8aRUx7Y6mj72',
//       cabin: 'COACH',
//       bookingCode: 'M',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object] } ],
//   [ { kind: 'qpxexpress#segmentInfo',
//       duration: 75,
//       flight: [Object],
//       id: 'GYn5izvcvq3+pxkI',
//       cabin: 'COACH',
//       bookingCode: 'H',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object],
//       connectionDuration: 41 },
//     { kind: 'qpxexpress#segmentInfo',
//       duration: 169,
//       flight: [Object],
//       id: 'G49-JGFsM8GyopL+',
//       cabin: 'COACH',
//       bookingCode: 'H',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object] } ],
//   [ { kind: 'qpxexpress#segmentInfo',
//       duration: 136,
//       flight: [Object],
//       id: 'GB7F7LJCuDPTRs6X',
//       cabin: 'COACH',
//       bookingCode: 'M',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object],
//       connectionDuration: 70 },
//     { kind: 'qpxexpress#segmentInfo',
//       duration: 72,
//       flight: [Object],
//       id: 'GN+qNnLd3AT5v4NK',
//       cabin: 'COACH',
//       bookingCode: 'M',
//       bookingCodeCount: 7,
//       marriedSegmentGroup: '0',
//       leg: [Object] } ] ]
// BREAK OFF POINT TO CORRECT DATA!!!!!! // 

        var airlineCodeArr = [];
        var flightNumArr = [];
        var legArr = [];
        var connectionArr = [];
        for (var i=0; i<uniqueSegments.length; i++) {
          var flight = uniqueSegments[i].flight.carrier; // 1st error since correcting uniqueSegments
          var flightNum = uniqueSegments[i].flight.number;
          var leg = uniqueSegments[i].leg[0];
          var connectionDuration = uniqueSegments[i].connectionDuration;

          airlineCodeArr.push(flight);
          flightNumArr.push(flightNum);
          legArr.push(leg);
          connectionArr.push(connectionDuration);
        }
        console.log('airlineCodeArr: ', airlineCodeArr);
        console.log('flightNumArr: ', flightNumArr);
        console.log('legArr: ', legArr);
        console.log('connectionArr: ', connectionArr);

        var departureDates = [];
        var departureTimes = [];
        var arrivalDates = [];
        var arrivalTimes1stLeg = [];
        var departureTimes2ndLeg = [];
        // var timeDifference = 0;
        for (var i=0; i<legArr.length; i++) {
          var departure = legArr[i].departureTime;
          var arrival = legArr[i].arrivalTime;

          var departureDate = departure.slice(0,10);
          var departureTime = departure.slice(11,16);
          var arrivalDate = arrival.slice(0,10);
          var arrivalTime = arrival.slice(11,16);
          // timeDifference = arrival.slice(16,17) === '+' ? (-1 * arrival.slice(18,19)) : (arrival.slice(18,19));
          


          // this would mean there's a second leg
          if (connectionArr[i] !== undefined) {

            // So I have to calculate the departure time of the second flight
            var arrivalTimeInMinutes = (parseFloat(arrivalTime.slice(0,2)) * 60) + 
                                        parseFloat(arrivalTime.slice(3,5)); // (15 * 60) + 55

            var departureTime2ndLegInMinutes = arrivalTimeInMinutes + connectionArr[i];
            if (departureTime2ndLegInMinutes > 1440) {
              departureTime2ndLegInMinutes = departureTime2ndLegInMinutes - 1440;
            }
            var departureTime2ndLegInHours = Math.floor(departureTime2ndLegInMinutes / 60);
            var departureTime2ndLegInMinutes = departureTime2ndLegInMinutes - (60 * departureTime2ndLegInHours);
            if (departureTime2ndLegInMinutes < 10) {departureTime2ndLegInMinutes = '0' + departureTime2ndLegInMinutes;}
            
            var departureTime2ndLeg = departureTime2ndLegInHours + ':' + departureTime2ndLegInMinutes;
            departureTimes2ndLeg.push(departureTime2ndLeg);

          }
          
          departureDates.push(departureDate);
          departureTimes.push(departureTime);
          arrivalDates.push(arrivalDate);
          arrivalTimes1stLeg.push(arrivalTime);
        }

        console.log('Departure dates: ', departureDates);
        console.log('Departure times: ', departureTimes);
        console.log('Arrival dates: ', arrivalDates);
        console.log('Arrival times of 1st leg: ', arrivalTimes1stLeg);
        console.log('departureTimes2ndLeg: ', departureTimes2ndLeg);

        var finalArrivalTimes = [];

        // goes through the unique flight durations to get final arrival times
        for (var i=0; i<uniqueDurations.length; i++) {

          // this would mean there's a second leg
          if (connectionArr[i] !== undefined) { // NEED TO FIX HOW YOU CALCULATE FINAL ARRIVAL TIMES
            var duration = uniqueDurations[i]; // 1015
            var departureTime = departureTimes.shift();
            var departureTimeInMinutes = (parseFloat(departureTime.slice(0,2)) * 60) + 
                                          parseFloat(departureTime.slice(3,5)); // (15 * 60) + 55

            var arrivalTimeInMinutes = departureTimeInMinutes + duration + connectionArr[i];
            if (arrivalTimeInMinutes > 1440) {
              arrivalTimeInMinutes = arrivalTimeInMinutes - 1440;
            }
            var arrivalHours = Math.floor(arrivalTimeInMinutes / 60);
            var arrivalMinutes = arrivalTimeInMinutes - (60 * arrivalHours);
            if (arrivalMinutes < 10) {arrivalMinutes = '0' + arrivalMinutes;}

            // incorporate time difference here at some point...
            var arrivalTime = arrivalHours + ':' + arrivalMinutes;
            finalArrivalTimes.push(arrivalTime);
          } else {
            finalArrivalTimes.push(arrivalTimes1stLeg[i]); // no second leg
          }
        }
        console.log('Final arrival times: ', finalArrivalTimes); // in local time
      


        // STEP 3: BUILD UP AN ARRAY WITH ALL FLIGHT OBJECTS (w/out arrival times)
        // var flightsArr = [];
        // for (var i=0; i<uniquePrices.length; i++) {
        //   var flight = {};
        //   flight.originCode = general.origincode;
        //   flight.origin = general.origin;
        //   flight.originAirportName = general.originairportname;
        //   flight.destinationCode = general.destinationcode;
        //   flight.destination = general.destination;
        //   flight.destinationAirportName = general.destinationairportname
        }

      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
      }
      res.send(body); // sends resultsArr back to client
    });

  } // ends getFlights func
}