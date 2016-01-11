'use strict';

angular.module('cardTrader.bet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bet', {
    templateUrl: 'bet/bet.html',
    controller: 'BetCtrl'
  });
}])

.controller('BetCtrl', ["$scope", function($scope){

    $scope.test = 'bet test';

}]);