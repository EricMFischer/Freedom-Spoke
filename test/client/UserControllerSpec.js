var expect = chai.expect;

describe('UserController', function() {
  var $scope, $rootScope;

  beforeEach(module('User'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('UserController', {
        $scope: $scope
      });
    };

    createController();
  }));

  // checking for test is just a test to test the tests
  // we'll probably remove eventually
  it('should have a test property on the $scope', function() {
    expect($scope.test).to.be.a('string');
  });
});
