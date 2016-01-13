'use strict';

var cardTrader = angular.module("cardTrader",['ngRoute','firebase'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/login",{
        templateUrl:"login/login.html",
        controller:"LoginCtrl"
    })
    .when("/make",{
        templateUrl:"make/make.html",
        controller:"MakeCtrl",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                return Auth.$requireAuth();
            }]
        }
    })
    .when("/battle",{
        templateUrl:"battle/battle.html",
        controller:"BattleCtrl",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                return Auth.$requireAuth();
            }]
        }
    })
    .when("/bet",{
        templateUrl:"bet/bet.html",
        controller:"BetCtrl",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                return Auth.$requireAuth();
            }]
        }
    })
    .when("/trade",{
        templateUrl:"trade/trade.html",
        controller:"TradeCtrl",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                return Auth.$requireAuth();
            }]
        }
    })
    .otherwise({redirectTo:"/login"})
}])
.factory("Auth", ["$firebaseAuth", function($firebaseAuth){
    var ref = new Firebase("https://docs-sandbox.firebaseio.com");
    return $firebaseAuth(ref);
  }
])
.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
}]);