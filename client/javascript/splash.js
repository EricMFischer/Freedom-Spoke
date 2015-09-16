(function() {

  var app = angular.module('Splash', []);

  app.controller('SplashController', ['$location', '$scope', '$timeout', 'UserFactory', function($location, $scope, $timeout, UserFactory) {

    $scope.signout = UserFactory.signout;

    // $scope.goToHome = function() {
    //   console.log('got to goToHome');
    //   $location.path('/home');
    //   $timeout(function() {
    //     $('#datetimepicker1').datetimepicker({
    //       format: 'YYYY/MM/DD'
    //     });
    //   }, 3000);
    // }

  }]);
  
})();