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
      console.log('got to getFlights');
      console.log(from, to, when);

      $rootScope.$broadcast('loading');
      if (from !== undefined && to !== undefined && when !== undefined) {

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



  // app.directive('psDatetimePicker', function (moment) {
  //   var format = 'MM/DD/YYYY hh:mm A';

  //   return {
  //       restrict: 'A',
  //       require: 'ngModel',
  //       link: function (scope, element, attributes, ctrl) {
  //           element.datetimepicker({
  //               format: format
  //           });
  //           var picker = element.data("DateTimePicker");

  //           ctrl.$formatters.push(function (value) {
  //               var date = moment(value);
  //               if (date.isValid()) {
  //                   return date.format(format);
  //               }
  //               return '';
  //           });

  //           /**
  //           * Update datetime picker's value from ng-model when opening the datetime picker's dropdown
  //           */
  //           element.on('dp.show', function() {
  //               picker.setDate(ctrl.$viewValue);
  //           });

  //           /**
  //           * Update ng-model when  datetime picker's value changes
  //           */
  //           element.on('change', function (event) {
  //               scope.$apply(function () {
  //                   var date = picker.getDate();
  //                   ctrl.$setViewValue(date);
  //               });
  //           });
  //       }
  //   };
  // });

})();