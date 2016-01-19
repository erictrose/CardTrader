app.controller("AuthCtrl", function($scope,$rootScope,Auth,$http){
    //on auth change
    Auth.$onAuth(function(authData){
        $scope.authData = authData;
        
        if(authData){
            $rootScope.currentUser = authData;
            console.log("On Login- ", $rootScope.currentUser.uid);
        };
        
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