(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.previousDay = function() {
      $rootScope.$broadcast('previousDay');
    }

    $scope.nextDay = function() {
      $rootScope.$broadcast('nextDay');
    }


    $scope.$on('loading', function (event) {
      $scope.loading = true;
      $scope.noResults = false;
    });

    $scope.$on('results', function (event, response) {
      $scope.noResults = false;
      $scope.loading = false;

      if (response === 'No results available') {
        $scope.noResults = true;
      } else {
        var tripsArr = response; // array of trip objects
        // console.log('tripsArr in results.js: ', tripsArr);
        $scope.flights = [];

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
        } // ends for loop


        var destinations = {}; // destinations obj with keys for each destination
        // build up unique destination arrays full of their flight objects
        $scope.flights.forEach(function(flightObj) {
          var city = flightObj.destination;
          if (!destinations.hasOwnProperty(city)) {
            destinations[city] = [];
            destinations[city].push(flightObj);
          } else {
            destinations[city].push(flightObj);
          }
        });
        // console.log('destinations obj: ', destinations);


        var destCount = 0;
        // assign $scope.dest1url, $scope.dest2url, and so forth for results.html
        for (var key in destinations) {
          destCount++;
          var legs = destinations[key][0].legs; // for 'to' property calculation

          var from = destinations[key][0].legs[0][0];
          var to = destinations[key][0].legs[legs.length - 1][1];
          var when = destinations[key][0].legs[0][5];
          var destUrl = 'https://skiplagged.com/' + '?src=' + from + '&dst=' + to + '&when=' + when;
          $scope['dest' + destCount + 'url'] = destUrl;
          $scope['dest' + destCount] = key;
        }
        destCount = 0; // reinitialize destCount to 0


        $scope.destination1 = [];
        $scope.destination2 = [];
        $scope.destination3 = [];
        $scope.destination4 = [];
        $scope.destination5 = [];
        $scope.destination1Avail = false;
        $scope.destination2Avail = false;
        $scope.destination3Avail = false;
        $scope.destination4Avail = false;
        $scope.destination5Avail = false;
        // with destinations obj, make unique $scope properties for results.html view
        var count = 0;
        for (var key in destinations) {
          count++;
          // gets unique destination arrays attached to $scope
          $scope['destination' + count] = destinations[key];
          // and sort the destination arrays by price
          $scope['destination' + count].sort(function(a,b) {
            if (Number(a.price) > Number(b.price)) {
              return 1;
            }
            if (Number(a.price) < Number(b.price)) {
              return -1;
            }
            return 0;
          });
          // makes destinations available for template
          $scope['destination' + count + 'Avail'] = true;
          // gets cities for template
          $scope['destination' + count + 'city'] = destinations[key][0].destination;
        }


        // lastly, sort $scope.flights array for the ALL tab before you make the resultsAvailable
        $scope.flights.sort(function(a,b) {
          if (Number(a.price) > Number(b.price)) {
            return 1;
          }
          if (Number(a.price) < Number(b.price)) {
            return -1;
          }
          return 0;
        });


        $scope.resultsAvailable = true;
      } // ends else statement (if checked for 'No results available')
    }); // ends 1st func in controller

  }]);

})();

//   $scope.plane = 'https://cdn0.iconfinder.com/data/icons/gcons-2/22/airplane1-48.png';