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



    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {
      $rootScope.$broadcast('loading');
      if (from !== undefined && to !== undefined && when !== undefined) {
        queries++;
        return $http.post('/api/flights', {
          from: from,
          to: to,
          when: when
        }).then(function(response) {
          responses++;
          console.log('response was returned: ', response);
          if (response.data === 'No results available') {
            console.log('line 33 of search.js: ', response.data);
            $rootScope.$broadcast('results', response.data);
          } else {

            arrOfTripObjs = arrOfTripObjs.concat.apply(arrOfTripObjs, response.data); // each response.data is an array of trip objects (for 1 destination)

            if (queries === responses) {
              $rootScope.$broadcast('results', arrOfTripObjs);
              queries = 0;
              responses = 0;
              arrOfTripObjs = [];
            }
          }

        }); 
      }
    };


  }]); // closes controller

})();