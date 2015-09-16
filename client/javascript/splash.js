(function() {

  var app = angular.module('Splash', []);

  app.controller('SplashController', ['$location', '$scope', 'UserFactory', function($location, $scope, UserFactory) {

    $scope.signout = UserFactory.signout;



  }]);
  
})();