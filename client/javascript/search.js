(function() {

  var app = angular.module('Search', []);

  app.factory('Flights', ['$http', function($http) {
    var obj = {};

    obj.getFlights = function(url) {
      console.log('Got to getFlights in Flights Factory');
      return $http.post('/api/flights', {url: url})
        .success(function(data) {
          // using Angular $http service to query our flights route
          // success cb executes when request returns
          // route returns a list of flights
          obj.flights = data;
        });
    };

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

    // calls getFlights in Flights factory
    $scope.flights = function(from, to, when, whenBack) {
      var flightUrl = 'https://skiplagged.com/';
      
      // Construct URL for request
      flightUrl += '?src=' + 
      from + '&dst=' + 
      to + '&when=' + 
      when + '&whenBack=' + 
      whenBack + '&sort=cost';
      console.log('Flight Url: ', flightUrl);

      // https://skiplagged.com/flights/LAX/SFO/2015-08-28/2015-08-30

      // https://skiplagged.com/?src=LAX&dst=SFO&when=2015-04-09&whenBack=2015-12-09&sort=cost
      
      $scope.getFlights(flightUrl);
    };
    
    $scope.getFlights = function(url) {
      Flights.getFlights(url)
        .success(function(data) {
          console.log(data);
          $scope.flights = data; // use this
        });
    };


    // request(url, function(error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     var $ = cheerio.load(body);
    //         console.log(body);
    //     return body; 
    //     } 
    //     else {
    //       return error;
    //     }
    // });

  }]);

})();