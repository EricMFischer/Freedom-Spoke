(function() {

  var app = angular.module('Search', []);

  app.controller('SearchController', ['$scope', '$rootScope', '$location', '$http', 'UserFactory', 'AirportsFactory', function($scope, $rootScope, $location, $http, UserFactory, AirportsFactory) {

    $scope.home = function() {
      $location.path('/');
    }

    $scope.signin = function() {
      $location.path('/signin');
    }

    $scope.signout = UserFactory.signout;

    // For airport codes
    $("#origin").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#origin").val(airportStr.slice(-3));
      }
    });
    $("#destinationOne").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationOne").val(airportStr.slice(-3));
      }
    });
    $("#destinationTwo").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationTwo").val(airportStr.slice(-3));
      }
    });
    $("#destinationThree").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationThree").val(airportStr.slice(-3));
      }
    });
    $("#destinationFour").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationFour").val(airportStr.slice(-3));
      }
    });
    $("#destinationFive").autocomplete({
      source: AirportsFactory.airports,
      minLength: 2,
      // delay: 250,
      select: function (event, airport) {
        event.preventDefault();
        var airportStr = airport.item.value;
        $("#destinationFive").val(airportStr.slice(-3));
      }
    });


    // console.log(typeof $('#datetimepicker1').datetimepicker);
    $('#datetimepicker1').datetimepicker({
      format: 'YYYY/MM/DD'
    });


    var formatDate = function(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }


    // getting a variable 'date' in the event user uses calendar
    var date;
    $scope.datepicker = function () {
      var datepicker = $('#datetimepicker1').parent();
      datepicker.on('dp.change', function(e) {
        var dateNum = e.date;
        date = formatDate(e.date);
      });
    };


    var yesterday;
    $scope.$on('previousDay', function (event) {
      if ($scope.loading === true) {
        return;
      }
      yesterday = new Date(date);
      yesterday.setDate(yesterday.getDate());
      yesterday = formatDate(yesterday);
      // console.log('yesterday: ', yesterday);
      $('#date').val(yesterday);
      date = $('#date').val();

      $scope.getFlights(null, null, yesterday);
      $scope.getFlights(null, null, yesterday);
      $scope.getFlights(null, null, yesterday);
      $scope.getFlights(null, null, yesterday);
      $scope.getFlights(null, null, yesterday);
    });

    var tomorrow;
    $scope.$on('nextDay', function (event) {
      if ($scope.loading === true) {
        return;
      }
      tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 2);
      tomorrow = formatDate(tomorrow);
      // console.log('tomorrow: ', tomorrow);
      $('#date').val(tomorrow);
      date = $('#date').val();

      $scope.getFlights(null, null, tomorrow);
      $scope.getFlights(null, null, tomorrow);
      $scope.getFlights(null, null, tomorrow);
      $scope.getFlights(null, null, tomorrow);
      $scope.getFlights(null, null, tomorrow);
    });


    // $scope.master = {};
    // $scope.update = function(search) {
    //   $scope.master = angular.copy(search);
    // };
    $scope.refresh = function() {
      // $scope.search = angular.copy($scope.master);
      $("#date").val('');
      $("#origin").val('');
      $("#destination").val('');
      $("#destinationOne").val('');
      $("#destinationTwo").val('');
      $("#destinationThree").val('');
      $("#destinationFour").val('');
      $("#destinationFive").val('');
    };
    // $scope.reset();


    var callsToGetFlights = 0;
    var queries = 0;
    var responses = 0;
    var arrOfTripObjs = [];
    $scope.getFlights = function(from, to, when) {
      from = $('#origin').val().toUpperCase();
      when = when || date;
      callsToGetFlights++;

      if (callsToGetFlights === 1) {
        to = $('#destinationOne').val().toUpperCase();
        // console.log('from, to, when: ', from, to, when);
      }
      if (callsToGetFlights === 2 && $('#destinationTwo').val() !== '') {
        to = $('#destinationTwo').val().toUpperCase();
      }
      if (callsToGetFlights === 3 && $('#destinationThree').val() !== '') {
        to = $('#destinationThree').val().toUpperCase();
      }
      if (callsToGetFlights === 4 && $('#destinationFour').val() !== '') {
        to = $('#destinationFour').val().toUpperCase();
      }
      if (callsToGetFlights === 5 && $('#destinationFive').val() !== '') {
        to = $('#destinationFive').val().toUpperCase();
      }


      if (from !== undefined && to !== undefined && when !== undefined) {
        $scope.loading = true;
        $rootScope.$broadcast('loading');

        queries++;

        return $http.post('/api/flights', {
          from: from,
          to: to,
          when: when
        }).then(function(response) {

          responses++;
          
          if (response.data === 'No results available' && queries === responses) {
            $rootScope.$broadcast('results', response.data);
            callsToGetFlights = 0;
            queries = 0;
            responses = 0;
            arrOfTripObjs = [];

          } else {

            arrOfTripObjs = arrOfTripObjs.concat.apply(arrOfTripObjs, response.data); // each response.data is an array of trip objects (for 1 destination)

            if (queries === responses) {
              // console.log('arroftripobjs: ', arrOfTripObjs);
              $rootScope.$broadcast('results', arrOfTripObjs);
              callsToGetFlights = 0;
              queries = 0;
              responses = 0;
              arrOfTripObjs = [];
              $scope.loading = false;
            }
          }
        });
      } 
    };

  }]); // closes controller

})();