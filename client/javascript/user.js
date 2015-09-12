(function() {

  var app = angular.module('User', []);

  app.factory('UserFactory', ['$http', '$location', '$window', function($http, $location, $window) {

    var obj = {}; // export obj from factory so you have the freedom to add new objects and methods later

    obj.signup = function(user) { // signup takes empty user object from controller
      return $http.post('/api/users/signup', {
        username: user.username,
        password: user.password
      })
      .then(function (resp) {
        console.log('response in signup factory: ', resp);
        return resp.data.token;
      });
    };

    obj.signin = function(user) {
      return $http.post('api/users/signin', {
        username: user.username,
        password: user.password
      })
      .then(function (resp) {
        console.log('response in signin factory: ', resp);
        return resp.data.token;
      });
    };

    obj.isAuth = function () {
      // console.log($window.localStorage.getItem('com.FreedomSpoke'));
      return !!$window.localStorage.getItem('com.FreedomSpoke');
    };

    obj.signout = function () {
      obj.currentUser = null;
      $window.localStorage.removeItem('com.FreedomSpoke');
      $window.localStorage.removeItem('com.FreedomSpoke.username');
      $location.path('/signin');
    };

    return obj;
  }]);

  app.controller('UserController', ['$location', '$window', '$scope', 'UserFactory', function($location, $window, $scope, UserFactory) {

    $scope.user = {};
    
    // signup
    $scope.signup = function() {
      UserFactory.signup($scope.user)
        .then(function (token) {
          console.log('token returned to signup controller: ', token);
          $window.localStorage.setItem('com.FreedomSpoke', token);
          $window.localStorage.setItem('com.FreedomSpoke.username', $scope.user.username);
          $location.path('/home'); // takes you now to home page, after signing up
        })
        .catch(function (error) {
          // show error message
          $scope.incorrectSignup = true;
          console.log('Error is below');
          console.error(error);
        });
    };
    
    // signin
    $scope.signin = function() {
      $("[data-toggle=popover]").popover();
      UserFactory.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.FreedomSpoke', token);
          $window.localStorage.setItem('com.FreedomSpoke.username', $scope.user.username);
          $location.path('/home');
        })
        .catch(function (error) {
          // show error message
          $scope.incorrectSignin = true;
          console.error(error);
        });
    };
  }]);


})();

