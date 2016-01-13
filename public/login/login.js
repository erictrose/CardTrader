'use strict';

cardTrader

.controller('LoginCtrl', ["$scope", "Auth", function($scope, Auth){
    
    $scope.auth = Auth;
    
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        $scope.test = Auth
    });

//    $scope.test = 'login test';
    
//    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//    var auth = $firebaseAuth(ref);
    
//    $scope.message = 'hey';
    
//    $scope.yell = function(){console.log('YYEEAAHH')};
    
    $scope.login = function(){
        $scope.authData = null;
        $scope.error = null;

        //maybe $authWithPassword?
        auth.$authWithPassword({
            email    : $scope.loginEmail,
            password : $scope.loginPassword
        }, function(error, authData){
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        })

        .then(function(authData){
            $scope.authData = authData;
        })
        .catch(function(error){
            $scope.error = error;
        });
    };
    
    //WORKING
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.signupEmail,
        password: $scope.signupPassword
      }).then(function(userData) {
        $scope.message = "User created with uid: " + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    

}]);
