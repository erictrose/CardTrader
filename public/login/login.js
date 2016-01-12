'use strict';

angular.module('cardTrader.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth){

    var ref = new Firebase("https://cardtraderdb.firebaseio.com");
    
    //login
    $scope.login = function(){
        ref.authWithPassword({
          email    : $scope.loginEmail,
          password : $scope.loginPassword
        }, function(error, authData){
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    };

    //create account
    $scope.createAccount = function(){
        ref.createUser({
          email    : $scope.email,
          password : $scope.password
        }, function(error, userData){
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });
    };
    

}]);