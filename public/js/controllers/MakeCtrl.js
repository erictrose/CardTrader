app.controller("MakeCtrl", ["currentAuth", "$scope", "$firebaseArray", function(currentAuth, $scope, $firebaseArray) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'make test';
    $scope.twentycards = ['x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x',];
    $scope.tencards = ['x','x','x','x','x','x','x','x','x','x',];
    $scope.fourcards = ['x','x','x','x',];
    
    
    
    
    
    
var firebaseCards = new Firebase("https://card-trader.firebaseio.com/cards");
$scope.cards = $firebaseArray(firebaseCards);
    
    
    
    
    
}]);