(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', function($scope) {

    var tripsArr = [ 
    { originCode: 'EVV',
    origin: 'Evansville',
    originAirportName: 'Evansville Dress Regional',
    destinationCode: 'HOU',
    destination: 'Houston',
    destinationAirportName: 'Houston William P. Hobby',
    price: '$317.60',
    duration: 5,
    legStart1: 'EVV',
    legEnd1: 'ORD',
    legDuration1: 1,
    legCarrier1: 'UA',
    legFlightNumber1: '4642',
    legDepartureDate1: '2015-10-10',
    legDepartureTime1: '10:24',
    legArrivalDate1: '2015-10-10',
    legArrivalTime1: '11:39',
    legStart2: 'ORD',
    legEnd2: 'IAH',
    legDuration2: 3,
    legCarrier2: 'UA',
    legFlightNumber2: '436',
    legDepartureDate2: '2015-10-10',
    legDepartureTime2: '12:20',
    legArrivalDate2: '2015-10-10',
    legArrivalTime2: '15:09' },
  { originCode: 'EVV',
    origin: 'Evansville',
    originAirportName: 'Evansville Dress Regional',
    destinationCode: 'HOU',
    destination: 'Houston',
    destinationAirportName: 'Houston William P. Hobby',
    price: '$317.60',
    duration: 5,
    legStart1: 'EVV',
    legEnd1: 'DFW',
    legDuration1: 2,
    legCarrier1: 'US',
    legFlightNumber1: '3598',
    legDepartureDate1: '2015-10-10',
    legDepartureTime1: '14:04',
    legArrivalDate1: '2015-10-10',
    legArrivalTime1: '16:20',
    legStart2: 'DFW',
    legEnd2: 'IAH',
    legDuration2: 1,
    legCarrier2: 'US',
    legFlightNumber2: '2326',
    legDepartureDate2: '2015-10-10',
    legDepartureTime2: '17:30',
    legArrivalDate2: '2015-10-10',
    legArrivalTime2: '18:42' } ];

    $scope.plane = 'https://cdn0.iconfinder.com/data/icons/gcons-2/22/airplane1-48.png';
    $scope.origin = tripsArr[0].origin;
    $scope.destination = tripsArr[0].destination;

    $scope.flights = [];

    for (var i=0; i<tripsArr.length; i++) {
      var trip = tripsArr[i]; // trip obj
      var obj = {}; // building up objects to pass into $scope.flights
      obj.price = trip.price;
      obj.duration = trip.duration;

      if (Object.keys(trip).length === 17) {
        obj.legs = [[trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1]];
      }

      if (Object.keys(trip).length === 26) {
        obj.legs = [
        [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
        [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2]
        ];
      }

      if (Object.keys(trip).length === 35) {
        obj.legs = [
        [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
        [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
        [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3]
        ];
      }

      if (Object.keys(trip).length === 44) {
        obj.legs = [
        [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
        [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
        [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
        [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4] 
        ];
      }

      if (Object.keys(trip).length === 53) {
        obj.legs = [
        [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
        [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
        [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
        [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4],
        [trip.legStart5, trip.legEnd5, trip.legDuration5, trip.legCarrier5, trip.legFlightNumber5, trip.legDepartureDate5, trip.legDepartureTime5, trip.legArrivalDate5, trip.legArrivalTime5] 
        ];
      }

      if (Object.keys(trip).length === 62) {
        obj.legs = [
        [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
        [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
        [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
        [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4],
        [trip.legStart5, trip.legEnd5, trip.legDuration5, trip.legCarrier5, trip.legFlightNumber5, trip.legDepartureDate5, trip.legDepartureTime5, trip.legArrivalDate5, trip.legArrivalTime5],
        [trip.legStart6, trip.legEnd6, trip.legDuration6, trip.legCarrier6, trip.legFlightNumber6, trip.legDepartureDate6, trip.legDepartureTime6, trip.legArrivalDate6, trip.legArrivalTime6] 
        ];
      }

      $scope.flights.push(obj);
    }

    console.log($scope.flights);

    //   $scope.flights = [
    //     {
    //       legs: ,
    //       who: ,
    //       when: '3:08PM',
    //       notes: " I'll be in your neighborhood doing errands"
    //     },
    //     {
    //       what: 'Brunch this weekend?',
    //       who: 'Min Li Chan',
    //       when: '3:08PM',
    //       notes: " I'll be in your neighborhood doing errands"
    //     }
    //   ];
















































































































    // $scope.$on('results', function(event, response) {
    //   console.log('Response made it to results.js: ', response);
    //   if (response.data === 'No results available') {
    //     $scope.errorMessage = response.data;
    //   } else {
    //     var tripsArr = response.data; // array of trip objects

    //     for (var i=0; i<tripsArr.length; i++) {
    //       var trip = tripsArr[i]; // object

    //       $scope.origin = trip.origin;
    //       // $scope.originCode = trip.legStart1;
    //       $scope.destination = trip.destination;
    //       // $scope.destinationCode = trip.legEnd1;
    //       $scope.price = trip.price;
    //       $scope.duration = trip.duration;

    //       $scope.legStart1 = trip.legStart1;
    //       $scope.legEnd1 = trip.legEnd1;
    //       $scope.legDuration1 = trip.legDuration1;
    //       $scope.legCarrier1 = trip.legCarrier1;
    //       $scope.legFlightNumber1 = trip.legFlightNumber1;
    //       $scope.legDepartureDate1 = trip.legDepartureDate1;
    //       $scope.legDepartureTime1 = trip.legDepartureTime1;
    //       $scope.legArrivalDate1 = trip.legArrivalDate1;
    //       $scope.legArrivalTime1 = trip.legArrivalTime1;

    //       if (Object.keys(trip).length > 17) {
    //         $scope.legStart2 = trip.legStart2;
    //         $scope.legEnd2 = trip.legEnd2;
    //         $scope.legDuration2 = trip.legDuration2;
    //         $scope.legCarrier2 = trip.legCarrier2;
    //         $scope.legFlightNumber2 = trip.legFlightNumber2;
    //         $scope.legDepartureDate2 = trip.legDepartureDate2;
    //         $scope.legDepartureTime2 = trip.legDepartureTime2;
    //         $scope.legArrivalDate2 = trip.legArrivalDate2;
    //         $scope.legArrivalTime2 = trip.legArrivalTime2;
    //       }

    //       if (Object.keys(trip).length > 26) {
    //         $scope.legStart3 = trip.legStart3;
    //         $scope.legEnd3 = trip.legEnd3;
    //         $scope.legDuration3 = trip.legDuration3;
    //         $scope.legCarrier3 = trip.legCarrier3;
    //         $scope.legFlightNumber3 = trip.legFlightNumber3;
    //         $scope.legDepartureDate3 = trip.legDepartureDate3;
    //         $scope.legDepartureTime3 = trip.legDepartureTime3;
    //         $scope.legArrivalDate3 = trip.legArrivalDate3;
    //         $scope.legArrivalTime3 = trip.legArrivalTime3;
    //       }

    //       if (Object.keys(trip).length > 35) {
    //         $scope.legStart4 = trip.legStart4;
    //         $scope.legEnd4 = trip.legEnd4;
    //         $scope.legDuration4 = trip.legDuration4;
    //         $scope.legCarrier4 = trip.legCarrier4;
    //         $scope.legFlightNumber4 = trip.legFlightNumber4;
    //         $scope.legDepartureDate4 = trip.legDepartureDate4;
    //         $scope.legDepartureTime4 = trip.legDepartureTime4;
    //         $scope.legArrivalDate4 = trip.legArrivalDate4;
    //         $scope.legArrivalTime4 = trip.legArrivalTime4;
    //       }

    //       if (Object.keys(trip).length > 44) {
    //         $scope.legStart5 = trip.legStart5;
    //         $scope.legEnd5 = trip.legEnd5;
    //         $scope.legDuration5 = trip.legDuration5;
    //         $scope.legCarrier5 = trip.legCarrier5;
    //         $scope.legFlightNumber5 = trip.legFlightNumber5;
    //         $scope.legDepartureDate5 = trip.legDepartureDate5;
    //         $scope.legDepartureTime5 = trip.legDepartureTime5;
    //         $scope.legArrivalDate5 = trip.legArrivalDate5;
    //         $scope.legArrivalTime5 = trip.legArrivalTime5;
    //       }

    //       if (Object.keys(trip).length > 53) {
    //         $scope.legStart6 = trip.legStart6;
    //         $scope.legEnd6 = trip.legEnd6;
    //         $scope.legDuration6 = trip.legDuration6;
    //         $scope.legCarrier6 = trip.legCarrier6;
    //         $scope.legFlightNumber6 = trip.legFlightNumber6;
    //         $scope.legDepartureDate6 = trip.legDepartureDate6;
    //         $scope.legDepartureTime6 = trip.legDepartureTime6;
    //         $scope.legArrivalDate6 = trip.legArrivalDate6;
    //         $scope.legArrivalTime6 = trip.legArrivalTime6;
    //       }

    //       if (Object.keys(trip).length > 62) {
    //         $scope.legStart7 = trip.legStart7;
    //         $scope.legEnd7 = trip.legEnd7;
    //         $scope.legDuration7 = trip.legDuration7;
    //         $scope.legCarrier7 = trip.legCarrier7;
    //         $scope.legFlightNumber7 = trip.legFlightNumber7;
    //         $scope.legDepartureDate7 = trip.legDepartureDate7;
    //         $scope.legDepartureTime7 = trip.legDepartureTime7;
    //         $scope.legArrivalDate7 = trip.legArrivalDate7;
    //         $scope.legArrivalTime7 = trip.legArrivalTime7;
    //       }
 
    //     } // ends for loop
    //   } // ends else statement (if checked for 'No results available')
    // }); // ends 1st func in controller


  }]);

})();