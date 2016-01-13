'use strict';

// Declare app level module which depends on views, and components
var cardTrader = angular.module('cardTrader', [
    'ngRoute',
    'cardTrader.login',
    'cardTrader.make',
    'cardTrader.battle',
    'cardTrader.bet',
    'cardTrader.trade'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://cardtraderdb.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);
