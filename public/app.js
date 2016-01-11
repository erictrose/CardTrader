'use strict';

// Declare app level module which depends on views, and components
var cardTrader = angular.module('cardTrader', [
    'ngRoute',
    'cardTrader.make',
    'cardTrader.battle',
    'cardTrader.bet',
    'cardTrader.trade'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/make'});
}]);
