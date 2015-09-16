(function() {

  var app = angular.module('FreedomSpoke', ['ui.router', 'Search', 'Results', 'User', 'Splash', 'Airports']);

  app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      // .state('home', {
      //   url: '/home',
      //   views: {
      //     // main template is placed here (relatively named)
      //     '': { templateUrl: './views/home.html'},
      //     // child views defined here (absolutely named)
      //     'search@home': {
      //       templateUrl: './views/search.html',
      //       // controller: 'SearchController',
      //       data: { publicallyAccessible: true }
      //     },
      //     'results@home': {
      //       templateUrl: './views/results.html',
      //       // controller: 'ResultsController',
      //       data: { publicallyAccessible: true }
      //     }
      //   }
      // })
      .state('splash', {
        url: '/',
        templateUrl: 'views/splash.html',
        data: { publicallyAccessible: true }
      })

      .state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'views/home.html',
        data: { publicallyAccessible: false }
      })

      // nested home state and views
      .state('home.views', {
        url: '',
        views: {
          'search@home': {
            templateUrl: 'views/home.search.html',
            data: { publicallyAccessible: false }
          },
          'results@home': {
            templateUrl: 'views/home.results.html',
            data: { publicallyAccessible: false }
          }
        }
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        data: { publicallyAccessible: true }
      })

      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        data: { publicallyAccessible: true }
      });

    // $urlRouterProvider.otherwise('/');
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
  }]);

  app.factory('AttachTokens', function($window) {
    // this is an $httpInterceptor
    // its job is to stop all outgoing requests to look in local storage and find the user's token
    // then it adds the token to the header so the server can validate the request
    var attach = {
      request: function(object) {
        var jwt = $window.localStorage.getItem('com.FreedomSpoke');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })

  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready.
  // however, we want to make sure the user is authorized.
  // we listen for when angular is trying to change routes.
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's invalid, we'll redirect back to signin/signup
  
  // fired at $rootScope level
  // $stateChangeStart - fired when the transition begins
  .run(function ($rootScope, $state, UserFactory) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!next.data) {return;}
      if (!next.data.publicallyAccessible && !UserFactory.isAuth()) {
        event.preventDefault(); // prevents transition from happening; transitionTo() promise will be rejected with a 'transition prevented' error
        $state.go('signin');
      }
    });
  });
  
  // .run(['$rootScope', '$state', '$stateParams',
  //   function ($rootScope, $state, $stateParams) {
  //     $rootScope.$state = $state;
  //     $rootScope.$stateParams = $stateParams;
  // }])

})();