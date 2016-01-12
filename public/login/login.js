'use strict';

angular.module('cardTrader.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ["$scope", function($scope){

    $scope.fname = "";
    $scope.email = "";
    $scope.pword = "";

}]);