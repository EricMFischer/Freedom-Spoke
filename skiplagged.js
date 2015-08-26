var Skiplagged = require('skiplagged');
var sl = new Skiplagged();

sl.flights('ORD', 'JFK', '2015-02-24', '2015-02-26');

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
},
{
  "time": "4h",
  "startTime1": "1:41pm",
  "endTime1": "2:51pm",
  ...
  ...
}]