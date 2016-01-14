//main app
var app = angular.module("app", ["firebase","ngRoute"]);

//config
app.config(["$routeProvider", function($routeProvider) {
$routeProvider
    //make
    .when("/make",{
        controller: "MakeCtrl",
        templateUrl: "views/make.html",
        resolve:{
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //battle
    .when("/battle",{
        controller: "BattleCtrl",
        templateUrl: "views/battle.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //bet
    .when("/bet",{
        controller: "BetCtrl",
        templateUrl: "views/bet.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //trade
    .when("/trade",{
        controller: "TradeCtrl",
        templateUrl: "views/trade.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    });    
}]);

//auth factory
app.factory("Auth", function($firebaseAuth){
    var ref = new Firebase("https://card-trader.firebaseio.com");
    return $firebaseAuth(ref);
});

//runtime?
app.run(["$rootScope", "$location", function($rootScope, $location){
    $rootScope.$on("$routeChangeError", function(event, next, previous, error){
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
}]);

//auth controller
app.controller("AuthCtrl", function($scope,Auth,$http){
    //on auth change
    Auth.$onAuth(function(authData){
        $scope.authData = authData;
        if(authData){
            //getRepos();
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
    //logout
    $scope.logout = function(){
        Auth.$unauth();
    };
    //sample api function
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

//navigation controller
app.controller("NavCtrl", ["$scope","$location", function($scope,$location) {
    $scope.goTo = function(dest){
        $location.path(dest);
    };
}]);

//make controller
app.controller("MakeCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'make test';
}]);

//battle controller
app.controller("BattleCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'battle test';
}]);

//bet controller
app.controller("BetCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'bet test';
}]);

//trade controller
app.controller("TradeCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'trade test';
}]);



console.log('app.js loaded');