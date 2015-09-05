(function() {

  var app = angular.module('Search', []);
  

  app.controller('SearchController', ['$scope', '$rootScope', '$http', 
    function($scope, $rootScope, $http) {

    $scope.master = {};
    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };
    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };
    $scope.reset();


    // var destinations = 1;
    // $scope.addDestination = function() {
    //   if (destinations !== 5) {destinations++;}
    //   if (destinations === 2) {
    //     $scope.destination2 = true;
    //   }
    //   if (destinations === 3) {
    //     $scope.destination3 = true;
    //   }
    //   if (destinations === 4) {
    //     $scope.destination4 = true;
    //   }
    //   if (destinations === 5) {
    //     $scope.destination5 = true;
    //   }
    // }
    // $scope.removeDestination = function() {
    //   if (destinations === 2) {
    //     $scope.destination2 = false;
    //   }
    //   if (destinations === 3) {
    //     $scope.destination3 = false;
    //   }
    //   if (destinations === 4) {
    //     $scope.destination4 = false;
    //   }
    //   if (destinations === 5) {
    //     $scope.destination5 = false;
    //   }
    //   if (destinations !== 1) {destinations--;}
    // }
    var queries = 0;
    var responses = 0;
    $scope.getFlights = function(from, to, when) {
      queries++;
      if (from !== undefined && to !== undefined && when !== undefined) {
        return $http.post('/api/flights', {
          from: from,
          to: to,
          when: when
        }).then(function(response) {
          var arrOfTripObjs = arrOfTripObjs || [];
          responses++;
          console.log('response: ', response);
          // each response is an array of trip objects (for 1 destination)
          arrOfTripObjs.concat(response);

          if (queries === responses) {
            queries = 0;
            responses = 0;
            console.log(arrOfTripObjs);
            $rootScope.$broadcast('results', arrOfTripObjs);
            arrOfTripObjs = [];
          }
          if (response.data === 'No results available') {
            // make input box red or something...
          }
        }); 
      }
    };

  }]); // closes controller

})();