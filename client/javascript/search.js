(function() {

  var app = angular.module('Search', []);


  app.controller('SearchController', ['$scope', '$rootScope', '$http', 'UserFactory', 'AirportsFactory', function($scope, $rootScope, $http, UserFactory, AirportsFactory) {


    $scope.signout = UserFactory.signout;


    // For airport codes
    $("#origin").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#origin").val(airportStr.slice(-3));
      }
    });
    $("#destinationOne").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationOne").val(airportStr.slice(-3));
      }
    });
    $("#destinationTwo").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationTwo").val(airportStr.slice(-3));
      }
    });
    $("#destinationThree").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationThree").val(airportStr.slice(-3));
      }
    });
    $("#destinationFour").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationFour").val(airportStr.slice(-3));
      }
    });
    $("#destinationFive").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      delay: 500,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationFive").val(airportStr.slice(-3));
      }
    });



    // getting a variable 'date' in the event user uses calendar
    var date;
    var tomorrow;
    var yesterday;
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
        
        // for tomorrow 
        tomorrow = new Date(result);
        tomorrow.setDate(tomorrow.getDate() + 2);
        tomorrow = formatDate(tomorrow);
        console.log('tomorrow: ', tomorrow);

        // for yesterday
        yesterday = new Date(result);
        yesterday.setDate(yesterday.getDate());
        yesterday = formatDate(yesterday);
        console.log('yesterday: ', yesterday);
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



    var callsToGetFlights = 0;
    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {

      from = $('#origin').val();
      when = date;
      callsToGetFlights++;

      if (callsToGetFlights === 1) {
        to = $('#destinationOne').val();
        // console.log('1st from, to, when: ', from, to, when);
      }
      if (callsToGetFlights === 2 && $('#destinationTwo').val() !== '') {
        to = $('#destinationTwo').val();
        // console.log('2nd from, to, when: ', from, to, when);
      }
      if (callsToGetFlights === 3 && $('#destinationThree').val() !== '') {
        to = $('#destinationThree').val();
        // console.log('3rd from, to, when: ', from, to, when);
      }
      if (callsToGetFlights === 4 && $('#destinationFour').val() !== '') {
        to = $('#destinationFour').val();
        // console.log('4th from, to, when: ', from, to, when);
      }
      if (callsToGetFlights === 5 && $('#destinationFive').val() !== '') {
        to = $('#destinationFive').val();
        // console.log('5th from, to, when: ', from, to, when);
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
              // console.log('arroftripobjs: ', arrOfTripObjs);
              $rootScope.$broadcast('results', arrOfTripObjs);
              callsToGetFlights = 0;
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