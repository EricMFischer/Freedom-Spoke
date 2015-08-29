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
  

  app.controller('SearchController', ['$scope', '$http', 'Flights', function($scope, $http, Flights) {

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
      }).then(function(res) {
        console.log('This is the res after querying the API: ', res);
        console.log('This is res.data: ', res.data);
        $scope.flights = res;
      });
    };


    
    // $scope.getFlights = function(url) {
    //   Flights.getFlights(url)
        // .success(function(data) {
        //   console.log(data);
        //   $scope.flights = data; // use this
        // });
    // };

  }]);

})();