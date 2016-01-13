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

.config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.factory("Auth", ["$firebaseAuth", function($firebaseAuth){
    var ref = new Firebase("https://cardtraderdb.firebaseio.com");
    return $firebaseAuth(ref);
}])

//.run(["$rootScope", "$location", function($rootScope, $location){
//    $rootScope.$on("$routeChangeError", function(event, next, previous, error){
//  // We can catch the error thrown when the $requireAuth promise is rejected
//  // and redirect the user back to the home page
//  if (error === "AUTH_REQUIRED") {
//    $location.path("/login");
//  }
//});
//}]);
