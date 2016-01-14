var app = angular.module("app", ["firebase","ngRoute"]);

app.factory("Auth", function($firebaseAuth){
    var ref = new Firebase("https://card-trader.firebaseio.com");
    return $firebaseAuth(ref);
});

app.config(["$routeProvider", function($routeProvider) {
$routeProvider.when("/home", {
  // the rest is the same for ui-router and ngRoute...
  controller: "HomeCtrl",
  templateUrl: "views/home.html",
  resolve: {
    // controller will not be loaded until $waitForAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above
    "currentAuth": ["Auth", function(Auth) {
      // $waitForAuth returns a promise so the resolve waits for it to complete
      return Auth.$waitForAuth();
    }]
  }
}).when("/account", {
  // the rest is the same for ui-router and ngRoute...
  controller: "AccountCtrl",
  templateUrl: "views/account.html",
  resolve: {
    // controller will not be loaded until $requireAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above
    "currentAuth": ["Auth", function(Auth) {
      // $requireAuth returns a promise so the resolve waits for it to complete
      // If the promise is rejected, it will throw a $stateChangeError (see above)
      return Auth.$requireAuth();
    }]
  }
});
}]);

app.run(["$rootScope", "$location", function($rootScope, $location){
    $rootScope.$on("$routeChangeError", function(event, next, previous, error){
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/home");
      }
    });
}]);

app.controller("AuthCtrl", function($scope,Auth,$http){
    
    //on auth change
    Auth.$onAuth(function(authData){
        $scope.authData = authData;
        if(authData){
//            getRepos();
        };
        console.log(authData);
    });
    
    //email login
    $scope.emaillogin = function(){
        Auth.$authWithPassword({
            email : $scope.loginEmail,
            password : $scope.loginPassword
        })
        .then(function(userData){
            $scope.provider = userData.provider;
            $scope.profileName = 'new user';
            $scope.profilePic = 'http://www.standard-icons.com/stock-icons/standard-dating/unknown_person-icon.gif';
        })
        .catch(function(error){
            console.log(error);
        });
    };
    
    //github login
    $scope.githublogin = function(){
        Auth.$authWithOAuthPopup("github")
        .then(function(userData){
            $scope.provider = userData.provider;
            $scope.profileName = userData.github.displayName;
            $scope.profilePic = userData.github.cachedUserProfile.avatar_url;
        })
        .catch(function(error){
            console.log(error);
        });
    };
    
    //twitter login
    $scope.twitterlogin = function(){
        Auth.$authWithOAuthPopup("twitter")
        .then(function(userData){
            $scope.provider = userData.provider;
            $scope.profileName = userData.twitter.displayName;
            $scope.profilePic = userData.twitter.profileImageURL;
        })
        .catch(function(error){
            console.log(error);
        });
    };
    
    //google login
    $scope.googlelogin = function(){
        Auth.$authWithOAuthPopup("google")
        .then(function(userData){
            $scope.provider = userData.provider;
            $scope.profileName = userData.google.displayName;
            $scope.profilePic = userData.google.profileImageURL;
        })
        .catch(function(error){
            console.log(error);
        });
    };
    
    //register
    $scope.register = function(){
//        $scope.message = null;
//        $scope.error = null;
        Auth.$createUser({
            email: $scope.registerEmail,
            password: $scope.registerPassword
        })
        .then(function(userData){
            $scope.message = "User created with uid: " + userData.uid;
        })
        .catch(function(error){
            console.log(error);
        });
    };
    
    $scope.logout = function(){
        Auth.$unauth();
    };
    
//    function getRepos(){
//        $http.get($scope.authData.github.cachedUserProfile.repos_url)
//        .success(function(repos){
//            $scope.repos = repos;
//        })
//        .error(function(error){
//            console.error(error);
//        })
//    };
});

console.log('app.js loaded');











app.controller("HomeCtrl", ["currentAuth", function(currentAuth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
}]);
app.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
}]);
