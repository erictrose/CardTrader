'use strict';

var cardTrader = angular.module("cardTrader",['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/login",{templateUrl:"login/login.html",controller:"LoginCtrl"})
    .when("/make",{templateUrl:"make/make.html",controller:"MakeCtrl"})
    .when("/battle",{templateUrl:"battle/battle.html",controller:"BattleCtrl"})
    .when("/bet",{templateUrl:"bet/bet.html",controller:"BetCtrl"})
    .when("/trade",{templateUrl:"trade/trade.html",controller:"TradeCtrl"})
    .otherwise({redirectTo:"/login"})
}])
