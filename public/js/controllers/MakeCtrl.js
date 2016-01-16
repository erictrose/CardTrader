app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
        
    //modal switch
    $scope.modalOpen = false;
    
    //bound card values
    $scope.myType = 'abc';
    $scope.myTitle = 'dudeman';
    $scope.myAttack = 5;
    $scope.myDefense = 7;
    $scope.myDesc = 'Irure occaecat nulla reprehenderit est exercitation sit. Et tempor quis anim officia aute ex sint proident laborum aute non. Labore ipsum eu adipisicing in amet eu adipisicing ipsum Lorem ex. Dolor sint cillum reprehenderit tempor ea deserunt excepteur elit. Nostrud ipsum Lorem veniam ea nulla tempor proident reprehenderit minim ut consequat.';
    
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