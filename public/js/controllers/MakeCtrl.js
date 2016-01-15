app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
        
    //modal switch
    $scope.modalOpen = false;
    
    //bound card values
    $scope.myType = 'ABC';
    $scope.myTitle = 'My Card Dude!';
    $scope.myAttack = 0;
    $scope.myDefense = 0;
    $scope.myDesc = 'This is my card!, it is super awesome and cool, dont you like it?';
    
    //add card function
    $scope.switchModal = function(){
        //if modal is open, close it, vice verca
        if(!$scope.modalOpen){$scope.modalOpen=true}
        else{$scope.modalOpen=false};
        console.log($scope.modalOpen);
    };
    
    //save card function
    $scope.saveCard = function(){
        console.log('card saved');
        $scope.switchModal();
    };
    
    //        $scope.cards.$add({
//            cardName: pushArray[i].cardName,
//            cardAttack: pushArray[i].cardAttack,
//            cardDefense: pushArray[i].cardDefense,
//            cardTotal: pushArray[i].cardTotal,
//            cardColor: pushArray[i].cardColor,
//            cardType: pushArray[i].cardType,
//            cardImg: pushArray[i].cardImg,
//            cardDesc: pushArray[i].cardDesc,
//            createTime: pushArray[i].createTime
//            });
    
    
    
}]);