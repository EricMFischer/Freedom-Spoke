(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', function($scope) {

    $scope.$on('results', function(event, response) {
      console.log('Response made it to results.js: ', response);

      if (response === 'No direct flights available to this location') {
        $scope.errorMessage = response;
      } else {
        var tripsArr = response; // an array of trip objects
        for (var i=0; i<tripsArr.length; i++) {
          var trip = tripsArr[i];

          $scope.originCode = trip.originCode;
          $scope.origin = trip.origin;
          $scope.originAirportName = trip.originAirportName;
          $scope.destinationCode = trip.destinationCode;
          $scope.destination = trip.destination;
          $scope.destinationAirportName = trip.destinationAirportName;
          $scope.price = trip.price;
          $scope.duration = trip.duration;

          $scope.1LegStart = trip.1LegStart;
          $scope.1LegEnd = trip.1LegEnd;
          $scope.1LegDuration = trip.1LegDuration;
          $scope.1LegCarrier = trip.1LegCarrier;
          $scope.1LegFlightNumber = trip.1LegFlightNumber;
          $scope.1LegDepartureDate = trip.1LegDepartureDate;
          $scope.1LegDepartureTime = trip.1LegDepartureTime;
          $scope.1LegArrivalDate = trip.1LegArrivalDate;
          $scope.1LegArrivalTime = trip.1LegArrivalTime;

          if (trip.2LegStart) {
            $scope.2LegStart = trip.2LegStart;
            $scope.2LegEnd = trip.2LegEnd;
            $scope.2LegDuration = trip.2LegDuration;
            $scope.2LegCarrier = trip.2LegCarrier;
            $scope.2LegFlightNumber = trip.2LegFlightNumber;
            $scope.2LegDepartureDate = trip.2LegDepartureDate;
            $scope.2LegDepartureTime = trip.2LegDepartureTime;
            $scope.2LegArrivalDate = trip.2LegArrivalDate;
            $scope.2LegArrivalTime = trip.2LegArrivalTime;
          }

          if (trip.3LegStart) {
            $scope.3LegStart = trip.3LegStart;
            $scope.3LegEnd = trip.3LegEnd;
            $scope.3LegDuration = trip.3LegDuration;
            $scope.3LegCarrier = trip.3LegCarrier;
            $scope.3LegFlightNumber = trip.3LegFlightNumber;
            $scope.3LegDepartureDate = trip.3LegDepartureDate;
            $scope.3LegDepartureTime = trip.3LegDepartureTime;
            $scope.3LegArrivalDate = trip.3LegArrivalDate;
            $scope.3LegArrivalTime = trip.3LegArrivalTime;
          }

          if (trip.4LegStart) {
            $scope.4LegStart = trip.4LegStart;
            $scope.4LegEnd = trip.4LegEnd;
            $scope.4LegDuration = trip.4LegDuration;
            $scope.4LegCarrier = trip.4LegCarrier;
            $scope.4LegFlightNumber = trip.4LegFlightNumber;
            $scope.4LegDepartureDate = trip.4LegDepartureDate;
            $scope.4LegDepartureTime = trip.4LegDepartureTime;
            $scope.4LegArrivalDate = trip.4LegArrivalDate;
            $scope.4LegArrivalTime = trip.4LegArrivalTime;
          }

          if (trip.5LegStart) {
            $scope.5LegStart = trip.5LegStart;
            $scope.5LegEnd = trip.5LegEnd;
            $scope.5LegDuration = trip.5LegDuration;
            $scope.5LegCarrier = trip.5LegCarrier;
            $scope.5LegFlightNumber = trip.5LegFlightNumber;
            $scope.5LegDepartureDate = trip.5LegDepartureDate;
            $scope.5LegDepartureTime = trip.5LegDepartureTime;
            $scope.5LegArrivalDate = trip.5LegArrivalDate;
            $scope.5LegArrivalTime = trip.5LegArrivalTime;
          }

          // $scope.link = resObj.link; 
        } // ends for loop through tripsArr
      } // ends else statement
    }); // ends emitted results event


  }]);

})();