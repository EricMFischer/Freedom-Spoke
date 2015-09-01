(function() {

  var app = angular.module('Search', []);

  app.factory('Flights', ['$http', function($http) {
    var obj = {};
    // obj.getFlights = function(from, to, when) {
    //   console.log('Got to getFlights in Flights Factory');
    //   return $http.post('/api/flights', {
    //     from: from,
    //     to: to,
    //     when: when
    //   })
    //   .success(function(data) {
    //     // using Angular $http service to query our flights route
    //     // success cb executes when request returns
    //     // route returns a list of flights
    //     obj.flights = data;
    //   });
    // };
    return obj;
  }]);
  

  app.controller('SearchController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $scope.master = {};
    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };
    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };
    $scope.reset();

    $scope.getFlights = function(from, to, when) { // took out whenback for now
      return $http.post('/api/flights', {
        from: from,
        to: to,
        when: when
      }).then(function(response) {
        // console.log('response body(s) after querying the API: ', response);
        // console.log('This is response.data: ', response.data);
        $rootScope.$broadcast('results', response);
        if (response.data === 'No results available') {
          // make input box red or something...
        }
      });
    };

  }]);

})();