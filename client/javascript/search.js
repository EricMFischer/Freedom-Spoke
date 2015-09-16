(function() {

  var app = angular.module('Search', []);
  

  // app.directive('autoComplete', function($timeout) {
  //   return function(scope, iElement, iAttrs) {
  //     iElement.autocomplete({
  //       source: scope[iAttrs.uiItems],
  //       select: function() {
  //         $timeout(function() {
  //           iElement.trigger('input');
  //         }, 0);
  //       }
  //     });
  //   };
  // });


  app.controller('SearchController', ['$scope', '$rootScope', '$http', 'UserFactory', 'AirportsFactory', function($scope, $rootScope, $http, UserFactory, AirportsFactory) {


    // For airport codes
    $scope.airports = AirportsFactory.airports;


    // getting a variable 'date' in the event user uses calendar
    var date;
    $scope.datepicker = function () {
      var datepicker = $('#datetimepicker1').parent();

      datepicker.on('dp.change', function(e) {
        var dateNum = e.date;
        var formatDate = function(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
        }
        var result = formatDate(e.date);
        date = result;
        console.log('result: ', result);
      });
    };


    $scope.master = {};
    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };
    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };
    $scope.reset();



    $scope.signout = UserFactory.signout;



    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {
      
      // if the ng-model didn't pick up the date (bc user used calendar)
      if (when === undefined) {
        when = date; // then when is equal to date
      }
      console.log('got to getFlights');
      console.log(from, to, when);

      if (from !== undefined && to !== undefined && when !== undefined) {
        $rootScope.$broadcast('loading');

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