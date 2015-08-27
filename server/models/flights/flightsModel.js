var mongoose = require('mongoose');

/*
Important to my app:

Origin – Destination
Departure date, time
Arrival date, time
Total flight time
Price
Airline
Forwarding link
*/

var FlightsSchema = new mongoose.Schema({
  time: String,
  startTime1: String,
  endTime1: String,
  startDate: String,
  startDate: String,
  flightNumber1: String,
  startTime2: String,
  endTime2: String,
  flightNumber2: String,
  layoverTime: String,
  startAirport: String,
  layoverAirport: String,
  endAirport: String,
  price: String,
  airline: String,
  flightURL: String,
  tripLength: String
});

module.exports = mongoose.model('Flights', FlightsSchema);

/*
Sample response from API:
[{
  "time": "5h",
  "startTime1": "3:17pm",
  "endTime1": "6:13pm",
  "startDate": "2015-02-14",
  "startDate": "2015-02-15",
  "flightNumber1": "1432",
  "startTime2": "7:05pm",
  "endTime2": "8:50pm",
  "flightNumber2": "1480",
  "layoverTime": "52m",
  "startAirport": "ORD",
  "layoverAirport": "CLT",
  "endAirport": "JFK",
  "price": "106",
  "airline": "American Airlines",
  "flightURL": "http://api.skiplagged.com/asplkdasddpoisakd",
  "tripLength": "3d"
}]

*/