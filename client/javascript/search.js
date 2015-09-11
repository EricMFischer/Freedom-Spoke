(function() {

  var app = angular.module('Search', []);
  

  app.controller('SearchController', ['$scope', '$rootScope', '$http', 'UserFactory', 
    function($scope, $rootScope, $http, UserFactory) {

    $scope.master = {};
    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };
    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };
    $scope.reset();


    $scope.logout = UserFactory.signout;


    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {


      $rootScope.$broadcast('loading');
      if (from !== undefined && to !== undefined && when !== undefined) {
      
      // send skiplagged url to results.js
      var destUrl = 'https://skiplagged.com/' + '?src=' + from + '&dst=' + to + '&when=' + when;
      $rootScope.$broadcast('skiplaggedUrl', destUrl);

        queries++;

        return $http.post('/api/flights', {
          from: from,
          to: to,
          when: when
        }).then(function(response) {

          responses++;
          if (response.data === 'No results available') {
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