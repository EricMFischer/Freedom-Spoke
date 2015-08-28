(function() {

  var app = angular.module('Search', []);
  
  app.controller('SearchController', ['$scope', function($scope) {
    $scope.master = {};

    $scope.update = function(search) {
      $scope.master = angular.copy(search);
    };

    $scope.reset = function() {
      $scope.search = angular.copy($scope.master);
    };

    $scope.reset();
  }]);

})();