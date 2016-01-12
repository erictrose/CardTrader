'use strict';

angular.module('cardTrader.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth){
    
    
    //set section buttons to disabled
    $scope.disable = 'not-active';
    
    
    
    
    
    $scope.loginEmail = '';
    $scope.loginPassword = '';
    
    $scope.signupName = '';
    $scope.signupEmail = '';
    $scope.signupPassword = '';
    
    
    

    var ref = new Firebase("https://cardtraderdb.firebaseio.com");
    
    //login
    $scope.login = function(){
        ref.authWithPassword({
          email    : $scope.loginEmail,
          password : $scope.loginPassword
        }, function(error, authData){
          if(error){
            console.log("email Login Failed!", error);
          }else{
            console.log("email Authenticated successfully with payload:", authData);
          }
        });
    };

    //create account
    $scope.signup = function(){
        ref.createUser({
          email    : $scope.signupEmail,
          password : $scope.signupPassword
        }, function(error, userData){
          if(error){
            console.log("email Error creating user:", error);
          }else{
            console.log(" email Successfully created user account with uid:", userData.uid);
          }
        });
    };
    
    //github login
    $scope.github = function(){
        ref.authWithOAuthPopup("github", function(error, authData){
            if(error){
                console.log("github Login Failed!", error);
            }else{
                console.log("github Authenticated successfully with payload:", authData);
            }
        });

        
    };
    

}]);