'use strict';

angular.module('cardTrader.battle', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/battle', {
    templateUrl: 'battle/battle.html',
    controller: 'BattleCtrl'
  });
}])

.controller('BattleCtrl', ["$scope", function($scope){

    $scope.test = 'battle test';

}]);