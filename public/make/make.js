'use strict';

angular.module('cardTrader.make', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/make', {
    templateUrl: 'make/make.html',
    controller: 'MakeCtrl'
  });
}])

.controller('MakeCtrl', ["$scope", function($scope){

    $scope.test = 'make test';

}]);