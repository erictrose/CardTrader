app.controller("ProfileCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'profile test';
    
    //define auth
    $scope.auth = currentAuth;
    
    //if logged in with github
    if($scope.auth.auth.provider === 'github'){
        $scope.auth1 = $scope.auth.github.username;
        $scope.auth2 =$scope.auth.github.profileImageURL;
        $scope.auth3 = 'cards';
    };
    
    //
    if($scope.auth.auth.provider === 'twitter'){
        $scope.auth1 = $scope.auth.twitter.username;
        $scope.auth2 =$scope.auth.twitter.profileImageURL;
        $scope.auth3 = 'cards';
    };
    
    //
    if($scope.auth.auth.provider === 'google'){
        $scope.auth1 = $scope.auth.google.displayName;
        $scope.auth2 =$scope.auth.google.profileImageURL;
        $scope.auth3 = 'cards';
    };
    
    //
    if($scope.auth.auth.provider === 'password'){
//        $scope.auth1 = $scope.auth.password.username;
        $scope.auth1 = $scope.auth.password.email;
        $scope.auth2 =$scope.auth.password.profileImageURL;
        $scope.auth3 = 'cards';
    };
    
}]);