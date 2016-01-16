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
    
//    //color options
//    $scope.colors = [{
//      id: 1,
//      label: 'aLabel',
//      subItem: { name: 'aSubItem' }
//    }, {
//      id: 2,
//      label: 'bLabel',
//      subItem: { name: 'bSubItem' }
//    }];
    
    //save card function
    $scope.saveCard = function(){
        

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
        
        
        
        
        console.log('card saved');
        //close modal
        $scope.switchModal();
    };    
}]);