(function() {

  var app = angular.module('User', []);

  app.factory('UserFactory', ['$http', '$location', '$window', function($http, $location, $window) {

    var obj; // export obj from factory so you have the freedom to add new objects and methods later

    obj.signup = function(user) { // signup takes empty user object from controller
      return $http.post('/api/users/signup', {
        username: user.username,
        password: user.password
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    return obj;
  }]);

  app.controller('UserController', ['$location', '$window', '$scope', 'UserFactory', function($location, $window, $scope, UserFactory) {

    $scope.user = {};
    
    // signup
    $scope.signup = function() {
      UserFactory.signup($scope.user)


    };
    
    // signin
    $scope.signin = function() {

    };
  }]);

})();

// $scope.signin = function () {
//   Auth.signin($scope.user)
//     .then(function (token) {
//       $window.localStorage.setItem('com.shortly', token);
//       $location.path('/links');
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// $scope.signup = function () {
//   Auth.signup($scope.user)
//     .then(function (token) {
//       $window.localStorage.setItem('com.shortly', token);
//       $location.path('/links');
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };