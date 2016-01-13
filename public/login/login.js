'use strict';

angular.module('cardTrader.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    })
}])

.controller('LoginCtrl', ['$scope', '$firebaseAuth', 'Auth', function($scope, $firebaseAuth, Auth){
    
    //set section buttons to disabled
    $scope.disable = 'not-active';
    
    //firebase auth
    $scope.auth = Auth;
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });
    
    
    
    //firebase login
    $scope.login = function() {
      $scope.authData = null;
      $scope.error = null;

      auth.$authAnonymously().then(function(authData) {
        $scope.authData = authData;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    
    
    //firebase create user
    $scope.createUser = function(){
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.signupEmail,
        password: $scope.signupPassword
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
          
        //redirect here?
          
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    //for removing users later
//    $scope.removeUser = function() {
//      $scope.message = null;
//      $scope.error = null;
//
//      Auth.$removeUser({
//        email: $scope.email,
//        password: $scope.password
//      }).then(function() {
//        $scope.message = "User removed";
//      }).catch(function(error) {
//        $scope.error = error;
//      });
//    };

    
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