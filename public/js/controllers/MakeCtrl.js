app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {
    
    //get cards from factory
    $scope.cards = Cards;
 
    //
    $scope.newAmount = '20';
    

}]);