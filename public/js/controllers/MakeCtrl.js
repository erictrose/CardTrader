app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
        
    //modal switch
    $scope.modalOpen = false;
    
    //add card function
    $scope.switchModal = function(){
        //if modal is open, close it, vice verca
        if(!$scope.modalOpen){$scope.modalOpen=true}
        else{$scope.modalOpen=false};
        console.log('toggled modal');
    };
    
    //default card color
    $scope.myColor = 'grey';
    
    
    //save card function
    $scope.saveCard = function(){
        //test for validation
            //get user data

//        $scope.cards.$add({
//        cardName: $scope.myTitle,
//        cardAttack: $scope.myAttack,
//        cardDefense: $scope.myDefense,
//        cardTotal: total(),
//        cardColor: $scope.myColor,
//        cardType: $scope.myType,
//        cardImg: '',
//        cardDesc: $scope.myDesc
//        });
        
        
        
        console.log(currentAuth);
        console.log('card saved');
        //close modal
        $scope.switchModal();
    };    
}]);