(function() {

  var app = angular.module('Search', []);


  app.controller('SearchController', ['$scope', '$rootScope', '$http', 'UserFactory', 'AirportsFactory', function($scope, $rootScope, $http, UserFactory, AirportsFactory) {


    $scope.signout = UserFactory.signout;


    // For airport codes
    $("#origin").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#origin").val(airportStr.slice(-3));
      }
    });


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
        // console.log('result: ', result);
      });
    };
  
    // console.log(typeof $('#datetimepicker1').datetimepicker);
    $('#datetimepicker1').datetimepicker({
      format: 'YYYY/MM/DD'
    });


    $scope.master = {};
    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };
    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };
    $scope.reset();



    // $scope.origin = function() {
    //   var origin = $('#origin').parent();
    //   console.log('origin', origin);

    // }



    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {
      console.log('from, to, when: ', from, to, when);
      // if the ng-model didn't pick up the date (bc user used calendar)
      if (when === undefined) {
        when = date; // then when is equal to date
      }

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