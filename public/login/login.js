'use strict';

angular.module('cardTrader.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    })
    .when('/logout', {
        resolve: {redirect: function(Session){
//            ref.unauth();
            console.log('logged out');
            return "/login";
        }}
    })
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'Auth', function($scope, $rootScope, $firebaseAuth, Auth){
    
    
    //set section buttons to disabled
    $scope.disable = 'not-active';
    
    
//    $scope.test = function(){console.log($scope.signupName,$scope.signupEmail,$scope.signupPassword)};
    
    
    
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
    
    
    
    
    
    
    $scope.loginEmail = '';
    $scope.loginPassword = '';
    
    $scope.signupName = '';
    $scope.signupEmail = '';
    $scope.signupPassword = '';
    
    
    
//NEED TO BE REMOVED??
//    var ref = new Firebase("https://cardtraderdb.firebaseio.com");
    
    
    

    // create an instance of the authentication service
//    var auth = $firebaseAuth(ref);
    
    
    // login with Facebook
//    auth.$authWithOAuthPopup("facebook").then(function(authData) {
//    console.log("Logged in as:", authData.uid);
//    }).catch(function(error) {
//    console.log("Authentication failed:", error);
//    });
    
    
    
    
    //login
//    $scope.login = function(){
//        ref.authWithPassword({
//          email    : $scope.loginEmail,
//          password : $scope.loginPassword
//        }, function(error, authData){
//          if(error){
//            console.log("email Login Failed!", error);
//          }else{
//            console.log("email Authenticated successfully with payload:", authData);
//          }
//        });
//    };

    //create account
//    $scope.signup = function(){
//        ref.createUser({
//          email    : $scope.signupEmail,
//          password : $scope.signupPassword
//        }, function(error, userData){
//          if(error){
//            console.log("email Error creating user:", error);
//          }else{
//            console.log(" email Successfully created user account with uid:", userData.uid);
//          }
//        });
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