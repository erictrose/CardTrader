'use strict';

angular.module('cardTrader.trade', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trade', {
    templateUrl: 'trade/trade.html',
    controller: 'TradeCtrl'
  });
}])

.controller('TradeCtrl', ["$scope", function($scope){

    $scope.test = 'trade test';

}]);