(function() {

  var app = angular.module('FlightPicker', ['ui.router']);

  app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'search': {
            templateUrl: 'views/search.html'
            // controller: 'SearchController'
          },
          'results': {
            templateUrl: 'views/results.html'
            // controller: 'ResultsController'
          },
          'map': {
            templateUrl: 'views/map.html'
            // controller: 'MapController'
          }
        }
      });
      // .state('state', {
      //   url:'/state',
      //   templateUrl: 'views/state.html',
      //   controller: 'StateController'
      // });
    $urlRouterProvider.otherwise('/');
  }]);

})();