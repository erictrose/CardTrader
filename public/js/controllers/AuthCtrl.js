app.controller("AuthCtrl", function($scope,$rootScope,Auth,$http,$location){
    
    //defaults
    $scope.loginText = 'login';
    $scope.registerText = 'register';
    $scope.providerError = '';
    
    //on auth change
    Auth.$onAuth(function(authData){
        $scope.authData = authData;
        
        if(authData){
            $rootScope.currentUser = authData;
            $location.path('/make');
            console.log("On Login- ", $rootScope.currentUser.uid);
        };
        
    });
    //email login
    $scope.emaillogin = function(){
        //if an email address is entered
        if($scope.loginEmail){
            //if a password is entered
            if($scope.loginPassword){
                //if password is 5 characters or more
                if($scope.loginPassword.length>=5){
                    //log user in
                    Auth.$authWithPassword({
                        email : $scope.loginEmail,
                        password : $scope.loginPassword
                    })
                    .then(function(userData){
                        $scope.provider = userData.provider;
                        $scope.profileName = 'new user';
                        $scope.profilePic = 'http://www.standard-icons.com/stock-icons/standard-dating/unknown_person-icon.gif';
                        //clear fields
                        $scope.loginEmail = '';
                        $scope.loginPassword = '';
                        $scope.loginText = 'login';
                        $scope.registerText = 'register';
                    })
                    .catch(function(error){
                        console.log(error);
                        $scope.loginText = 'sorry, please try again';
                        //clear fields
                        $scope.loginEmail = '';
                        $scope.loginPassword = '';
                    });
        
        
                } else {
                    $scope.loginText = 'password must be atleast 5 characters';
                };
            } else {
                $scope.loginText = 'please enter a password';
            };
        } else {
            $scope.loginText = 'please enter an email address';
        };
        
        
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
            $scope.providerError = 'github login error, please try again';
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
            $scope.providerError = 'twitter login error, please try again';
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
            $scope.providerError = 'google login error, please try again';
        });
    };
    //register
    $scope.register = function(){
        //if an email address is entered
        if($scope.registerEmail){
            //if a password is entered
            if($scope.registerPassword){
                //if password is 5 characters or more
                if($scope.registerPassword.length>=5){
                    //create account
                    Auth.$createUser({
                        email: $scope.registerEmail,
                        password: $scope.registerPassword
                    })
                    .then(function(userData){
                        console.log('account created, logging in');
                        //log account in
                        var instaAuth = function(){
                            Auth.$authWithPassword({
                                email : $scope.registerEmail,
                                password : $scope.registerPassword
                            })
                            .then(function(userData){
                                $scope.provider = userData.provider;
                                $scope.profileName = 'new user';
                                $scope.profilePic = 'http://www.standard-icons.com/stock-icons/standard-dating/unknown_person-icon.gif';
                                $scope.loginText = 'login';
                                $scope.registerText = 'register';
                            })
                            .catch(function(error){
                                console.log(error);
                                $scope.registerText = 'registration error';
                            });
                        };
                        instaAuth();
                        //clear fields
                        $scope.registerEmail = '';
                        $scope.registerPassword = '';
                    })
                    .catch(function(error){
                        console.log(error);
                        $scope.providerError = 'registration error, please try again';
                        $scope.registerEmail = '';
                        $scope.registerPassword = '';
                    });
                } else {
                    $scope.registerText = 'password must be atleast 5 characters';
                };
            } else {
                $scope.registerText = 'please enter a password';
            };
        } else {
            $scope.registerText = 'please enter an email address';
        };
    };
    //logout
    $scope.logout = function(){
        Auth.$unauth();
    };
    
//    $scope.profileName = $rootScope.currentUser || 'test';
    
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