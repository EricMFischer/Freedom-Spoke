// var expect = chai.expect;

// describe('ResultsController', function() {
//   var $scope, $rootScope;

//   beforeEach(module('Results'));

//   beforeEach(inject(function($injector) {
//     $rootScope = $injector.get('$rootScope');

//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');

//     createController = function() {
//       return $controller('ResultsController', {
//         $scope: $scope
//       });
//     };

//     createController();
//   }));

//   it('should have a questions property on the $scope', function() {
//     expect($scope.questions).to.be.an('array');
//   });

//   it('should have a question with property "question" on the $scope', function() {
//     expect($scope.questions[0].question).to.exist;
//   });

//   it('should have a question with string property "answer" on the $scope', function() {
//     expect($scope.questions[0].answer).to.be.an('string');
//   });
// });
