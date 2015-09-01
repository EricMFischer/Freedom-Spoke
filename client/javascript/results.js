(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', function($scope) {

    $scope.$on('results', function(event, response) {
      console.log('Response made it to results.js: ', response);
      if (response.data === 'No results available') {
        $scope.errorMessage = response.data;
      } else {
        var tripsArr = response.data; // array of trip objects
        for (var i=0; i<tripsArr.length; i++) { // NOTE: don't display originCode and destinationCode as  those of an ACTUAL journey; these are just the search requests by the client
          var trip = tripsArr[i]; // object

          $scope.origin = trip.origin;
          $scope.originCode = trip.legStart1;
          $scope.destination = trip.destination;
          // $scope.destinationCode = trip[trip.length - 8]; // represents end of last leg

          $scope.price = trip.price;
          $scope.duration = trip.duration;

          $scope.legStart1 = trip.legStart1;
          $scope.legEnd1 = trip.legEnd1;
          $scope.legDuration1 = trip.legDuration1;
          $scope.legCarrier1 = trip.legCarrier1;
          $scope.legFlightNumber1 = trip.legFlightNumber1;
          $scope.legDepartureDate1 = trip.legDepartureDate1;
          $scope.legDepartureTime1 = trip.legDepartureTime1;
          $scope.legArrivalDate1 = trip.legArrivalDate1;
          $scope.legArrivalTime1 = trip.legArrivalTime1;
          $scope.destinationCode = trip.legEnd1;

          if (trip.length > 17) {
            $scope.legStart2 = trip.legStart2;
            $scope.legEnd2 = trip.legEnd2;
            $scope.legDuration2 = trip.legDuration2;
            $scope.legCarrier2 = trip.legCarrier2;
            $scope.legFlightNumber2 = trip.legFlightNumber2;
            $scope.legDepartureDate2 = trip.legDepartureDate2;
            $scope.legDepartureTime2 = trip.legDepartureTime2;
            $scope.legArrivalDate2 = trip.legArrivalDate2;
            $scope.legArrivalTime2 = trip.legArrivalTime2;
            $scope.destinationCode = trip.legEnd2;
          }

          if (trip.length > 26) {
            $scope.legStart3 = trip.legStart3;
            $scope.legEnd3 = trip.legEnd3;
            $scope.legDuration3 = trip.legDuration3;
            $scope.legCarrier3 = trip.legCarrier3;
            $scope.legFlightNumber3 = trip.legFlightNumber3;
            $scope.legDepartureDate3 = trip.legDepartureDate3;
            $scope.legDepartureTime3 = trip.legDepartureTime3;
            $scope.legArrivalDate3 = trip.legArrivalDate3;
            $scope.legArrivalTime3 = trip.legArrivalTime3;
            $scope.destinationCode = trip.legEnd3;
          }

          if (trip.length > 35) {
            $scope.legStart4 = trip.legStart4;
            $scope.legEnd4 = trip.legEnd4;
            $scope.legDuration4 = trip.legDuration4;
            $scope.legCarrier4 = trip.legCarrier4;
            $scope.legFlightNumber4 = trip.legFlightNumber4;
            $scope.legDepartureDate4 = trip.legDepartureDate4;
            $scope.legDepartureTime4 = trip.legDepartureTime4;
            $scope.legArrivalDate4 = trip.legArrivalDate4;
            $scope.legArrivalTime4 = trip.legArrivalTime4;
            $scope.destinationCode = trip.legEnd4;
          }

          if (trip.length > 44) {
            $scope.legStart5 = trip.legStart5;
            $scope.legEnd5 = trip.legEnd5;
            $scope.legDuration5 = trip.legDuration5;
            $scope.legCarrier5 = trip.legCarrier5;
            $scope.legFlightNumber5 = trip.legFlightNumber5;
            $scope.legDepartureDate5 = trip.legDepartureDate5;
            $scope.legDepartureTime5 = trip.legDepartureTime5;
            $scope.legArrivalDate5 = trip.legArrivalDate5;
            $scope.legArrivalTime5 = trip.legArrivalTime5;
            $scope.destinationCode = trip.legEnd5;
          }

          if (trip.length > 53) {
            $scope.legStart6 = trip.legStart6;
            $scope.legEnd6 = trip.legEnd6;
            $scope.legDuration6 = trip.legDuration6;
            $scope.legCarrier6 = trip.legCarrier6;
            $scope.legFlightNumber6 = trip.legFlightNumber6;
            $scope.legDepartureDate6 = trip.legDepartureDate6;
            $scope.legDepartureTime6 = trip.legDepartureTime6;
            $scope.legArrivalDate6 = trip.legArrivalDate6;
            $scope.legArrivalTime6 = trip.legArrivalTime6;
            $scope.destinationCode = trip.legEnd6;
          }

          if (trip.length > 62) {
            $scope.legStart7 = trip.legStart7;
            $scope.legEnd7 = trip.legEnd7;
            $scope.legDuration7 = trip.legDuration7;
            $scope.legCarrier7 = trip.legCarrier7;
            $scope.legFlightNumber7 = trip.legFlightNumber7;
            $scope.legDepartureDate7 = trip.legDepartureDate7;
            $scope.legDepartureTime7 = trip.legDepartureTime7;
            $scope.legArrivalDate7 = trip.legArrivalDate7;
            $scope.legArrivalTime7 = trip.legArrivalTime7;
            $scope.destinationCode = trip.legEnd7;
          }

          // tripsArr AFTER adding specific flight properties:  [ { originCode: 'EVV',
          //     origin: 'Evansville',
          //     originAirportName: 'Evansville Dress Regional',
          //     destinationCode: 'HOU',
          //     destination: 'Houston',
          //     destinationAirportName: 'Houston William P. Hobby',
          //     price: '$317.60',
          //     duration: 289, // 8 items up to here
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
          //     legArrivalTime2: '20:24' }, // 26 items per trip object
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
          //     legArrivalTime2: '18:54' } ]
 
        } // ends for loop
      } // ends else statement (if checked for 'No results available')
    }); // ends 1st func in controller


  }]);

})();