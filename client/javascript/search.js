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

     //for handling user answers to trivia
    $scope.flights = function(from, to, when, whenBack) {
      var flightUrl = 'https://skiplagged.com/';
      
      // Construct URL for request
      flightUrl += '?src=' + 
      from + '&dst=' + 
      to + '&when=' + 
      when + '&whenBack=' + 
      whenBack + '&sort=cost';
      console.log('Flight Url', flightUrl);
      
      // https://skiplagged.com/flights/LAX/JFK/2015-09-25/2015-10-10

      // https://skiplagged.com/?src=LAX&dst=JFK&when=2015-28-08&whenBack=2015-10-10&sort=cost
      
      // getFlights(flightUrl);
    };



    // function(keyEvent, question) {
    //   if(keyEvent.keyCode === 13) {
    //     $scope.answered++;
    //     var id = question.id;
    //     var value = question.value;
    //     var userAns = question.userAnswer;
    //     return $http.post('/api/trivia', {
    //       id: id,
    //       value: value,
    //       userAns: userAns
    //     }).then(function (res) {
    //       var q = res.data;
    //       if(q.correct){
    //         $scope.correct++;
    //         $scope.currentStreak++;
    //         $scope.score += value;
    //       }else{
    //         $scope.currentStreak = 0;
    //       }
    //       if($scope.currentStreak > $scope.correctStreak){
    //         $scope.correctStreak = $scope.currentStreak;
    //       }
    //       $scope.nextLoc();
    //     });
    //   }
    // };


  }]);

})();