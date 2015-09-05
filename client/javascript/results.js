(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', function($scope) {

    $scope.$on('results', function(event, response) {
      // console.log('Response made it to results.js: ', response);
      if (response.data === 'No results available') {
        $scope.errorMessage = response.data;
      } else {


        var tripsArr = response.data; // array of trip objects

        // $scope.plane = 'https://cdn0.iconfinder.com/data/icons/gcons-2/22/airplane1-48.png';
        // $scope.origin = tripsArr[0].origin;
        // $scope.destination = tripsArr[0].destination;

        // $scope.sortType = 'price'; // set the default sort type
        $scope.flights = $scope.flights || [];

        for (var i=0; i<tripsArr.length; i++) {
          var trip = tripsArr[i]; // trip obj
          var obj = {}; // building up objects to pass into $scope.flights
          obj.price = trip.price;
          obj.duration = trip.duration;
          obj.origin = trip.origin;
          obj.destination = trip.destination;

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


          var sort = function() {
            $scope.flights.sort(function(a,b) {
              if (a.price > b.price) {
                return 1;
              }
              if (a.price < b.price) {
                return -1;
              }
              return 0;
            });
          }


          $scope.resultsAvailable = true;
        } // ends for loop
      } // ends else statement (if checked for 'No results available')

      console.log($scope.flights);
    }); // ends 1st func in controller


  }]);

})();


// var sort = function() {
//   return $q(function(resolve, reject) {
//     if ($scope.flights) {
//       resolve(
//         $scope.flights.sort(function(a,b) {
//           if (a.price > b.price) {
//             return 1;
//           }
//           if (a.price < b.price) {
//             return -1;
//           }
//           return 0;
//         })
//       );
//     }
//   });
// }
// var promise = sort();
// promise.then(function() {
//   $scope.resultsAvailable = true;
// });


//   var tripsArr = [ 
  //   { originCode: 'EVV',
  //   origin: 'Evansville',
  //   originAirportName: 'Evansville Dress Regional',
  //   destinationCode: 'HOU',
  //   destination: 'Houston',
  //   destinationAirportName: 'Houston William P. Hobby',
  //   price: '$317.60',
  //   duration: 5,
  //   legStart1: 'EVV',
  //   legEnd1: 'ORD',
  //   legDuration1: 1,
  //   legCarrier1: 'UA',
  //   legFlightNumber1: '4642',
  //   legDepartureDate1: '2015-10-10',
  //   legDepartureTime1: '10:24',
  //   legArrivalDate1: '2015-10-10',
  //   legArrivalTime1: '11:39',
  //   legStart2: 'ORD',
  //   legEnd2: 'IAH',
  //   legDuration2: 3,
  //   legCarrier2: 'UA',
  //   legFlightNumber2: '436',
  //   legDepartureDate2: '2015-10-10',
  //   legDepartureTime2: '12:20',
  //   legArrivalDate2: '2015-10-10',
  //   legArrivalTime2: '15:09' },
  // { originCode: 'EVV',
  //   origin: 'Evansville',
  //   originAirportName: 'Evansville Dress Regional',
  //   destinationCode: 'HOU',
  //   destination: 'Houston',
  //   destinationAirportName: 'Houston William P. Hobby',
  //   price: '$317.60',
  //   duration: 5,
  //   legStart1: 'EVV',
  //   legEnd1: 'DFW',
  //   legDuration1: 2,
  //   legCarrier1: 'US',
  //   legFlightNumber1: '3598',
  //   legDepartureDate1: '2015-10-10',
  //   legDepartureTime1: '14:04',
  //   legArrivalDate1: '2015-10-10',
  //   legArrivalTime1: '16:20',
  //   legStart2: 'DFW',
  //   legEnd2: 'IAH',
  //   legDuration2: 1,
  //   legCarrier2: 'US',
  //   legFlightNumber2: '2326',
  //   legDepartureDate2: '2015-10-10',
  //   legDepartureTime2: '17:30',
  //   legArrivalDate2: '2015-10-10',
  //   legArrivalTime2: '18:42' } ];

  //   $scope.plane = 'https://cdn0.iconfinder.com/data/icons/gcons-2/22/airplane1-48.png';
  //   $scope.origin = tripsArr[0].origin;
  //   $scope.destination = tripsArr[0].destination;

  //   $scope.flights = [];

  //   for (var i=0; i<tripsArr.length; i++) {
  //     var trip = tripsArr[i]; // trip obj
  //     var obj = {}; // building up objects to pass into $scope.flights
  //     obj.price = trip.price;
  //     obj.duration = trip.duration;

  //     if (Object.keys(trip).length === 17) {
  //       obj.legs = [[trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1]];
  //     }

  //     if (Object.keys(trip).length === 26) {
  //       obj.legs = [
  //       [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
  //       [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2]
  //       ];
  //     }

  //     if (Object.keys(trip).length === 35) {
  //       obj.legs = [
  //       [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
  //       [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
  //       [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3]
  //       ];
  //     }

  //     if (Object.keys(trip).length === 44) {
  //       obj.legs = [
  //       [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
  //       [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
  //       [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
  //       [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4] 
  //       ];
  //     }

  //     if (Object.keys(trip).length === 53) {
  //       obj.legs = [
  //       [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
  //       [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
  //       [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
  //       [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4],
  //       [trip.legStart5, trip.legEnd5, trip.legDuration5, trip.legCarrier5, trip.legFlightNumber5, trip.legDepartureDate5, trip.legDepartureTime5, trip.legArrivalDate5, trip.legArrivalTime5] 
  //       ];
  //     }

  //     if (Object.keys(trip).length === 62) {
  //       obj.legs = [
  //       [trip.legStart1, trip.legEnd1, trip.legDuration1, trip.legCarrier1, trip.legFlightNumber1, trip.legDepartureDate1, trip.legDepartureTime1, trip.legArrivalDate1, trip.legArrivalTime1], 
  //       [trip.legStart2, trip.legEnd2, trip.legDuration2, trip.legCarrier2, trip.legFlightNumber2, trip.legDepartureDate2, trip.legDepartureTime2, trip.legArrivalDate2, trip.legArrivalTime2], 
  //       [trip.legStart3, trip.legEnd3, trip.legDuration3, trip.legCarrier3, trip.legFlightNumber3, trip.legDepartureDate3, trip.legDepartureTime3, trip.legArrivalDate3, trip.legArrivalTime3],
  //       [trip.legStart4, trip.legEnd4, trip.legDuration4, trip.legCarrier4, trip.legFlightNumber4, trip.legDepartureDate4, trip.legDepartureTime4, trip.legArrivalDate4, trip.legArrivalTime4],
  //       [trip.legStart5, trip.legEnd5, trip.legDuration5, trip.legCarrier5, trip.legFlightNumber5, trip.legDepartureDate5, trip.legDepartureTime5, trip.legArrivalDate5, trip.legArrivalTime5],
  //       [trip.legStart6, trip.legEnd6, trip.legDuration6, trip.legCarrier6, trip.legFlightNumber6, trip.legDepartureDate6, trip.legDepartureTime6, trip.legArrivalDate6, trip.legArrivalTime6] 
  //       ];
  //     }

  //     $scope.flights.push(obj);
  //   }

  // console.log($scope.flights);