(function() {

  var app = angular.module('Results', []);
  
  app.controller('ResultsController', ['$scope', function($scope) {

    $scope.$on('results', function(event, response) {
      if (response === 'No direct flights available to this location') {
        $scope.errorMessage = 'No direct flights available to this location';
      }
      console.log('Reponse got all the way to results.js ', response); 
      // $scope.origin = resObj.origin;
      // $scope.destination = resObj.destination;
      // $scope.departuredate = resObj.departuredate;
      // $scope.departuretime = resObj.departuretime;
      // $scope.arrivaldate = resObj.arrivaldate;
      // $scope.arrivaltime = resObj.arrivaltime;
      // $scope.totalflighttime = resObj.totalflighttime;
      // $scope.price = resObj.price;
      // $scope.airline = resObj.airline;
      // $scope.link = resObj.link;
    });

    // $scope.displayResults = function(resObj) {
    // }

  }]);

})();