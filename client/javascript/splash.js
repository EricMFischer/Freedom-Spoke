(function() {

  var app = angular.module('Splash', []);

  app.controller('SplashController', ['$location', '$scope', '$timeout', 'UserFactory', function($location, $scope, $timeout, UserFactory) {

    $scope.signout = UserFactory.signout;

  }]);
  
})();