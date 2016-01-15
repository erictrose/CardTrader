app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
    
    var pushArray = [1,2,3,4,5];
    
    //dev: add cards to database
    $scope.addcards = function(){
        for(i=0;i<10;i++){
            console.log(pushArray[i]);
        }
    };
    
}]);