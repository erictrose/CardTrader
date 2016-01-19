app.controller("MyCardsCtrl", ["currentAuth", "$scope", "$firebaseArray", function(currentAuth, $scope, $firebaseArray) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'battle test';
    
//    //define auth
//    $scope.auth = currentAuth;
    
    //
    $scope.switchViewModal = function(card){console.log('switchViewModal fired')};
    
    //connect to firebase directories
    var myCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/" + currentAuth.uid);
    
    //link to variables
    var myCards = $firebaseArray(myCardsRef);
    
    //link to scope
    $scope.myCards = myCards;
    
}]);
