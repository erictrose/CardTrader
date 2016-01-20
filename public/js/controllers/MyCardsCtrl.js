app.controller("MyCardsCtrl", ["currentAuth", "$scope", "$firebaseArray", function(currentAuth, $scope, $firebaseArray) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    
    //
    $scope.notify = "";
    
    //defaults
    $scope.myColor = '';
    $scope.myTitle = '';
    $scope.myAttack = '';
    $scope.myDefense = '';
    $scope.myType = '';
    $scope.myDesc = '';
    $scope.myImg = '';
    $scope.currentCard = '';    
    
    
    
    //connect to firebase directories
    var myCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/" + currentAuth.uid);
//    var newestCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/newest");
//    var byNumbersCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/bynumbers");
    
//    //link to variables
//    var myCards = $firebaseArray(myCardsRef);
    
    //link to scope
    $scope.myCards = $firebaseArray(myCardsRef);
//    $scope.newest = $firebaseArray(newestCardsRef);
//    $scope.byNumbers = $firebaseArray(byNumbersCardsRef);
    
    //go back, needs to be a factory or service or something
    $scope.goBack = function(){
        window.history.back();
    };
    
    //add modal switch
    $scope.addModalOpen = false;
    
    
    //switch add modal function
    $scope.switchAddModal = function(card){
        //if modal is open, close it, vice verca
        if(!$scope.addModalOpen){
            console.log('toggled modal on');
            $scope.addModalOpen=true;
            
            //
            $scope.myColor = card.cardColor;
            $scope.myTitle = card.cardName;
            $scope.myAttack = card.cardAttack;
            $scope.myDefense = card.cardDefense;
            $scope.myType = card.cardType;
            $scope.myDesc = card.cardDesc;
            $scope.myImg = card.cardImg;
            $scope.currentCard = card;
        }
        else
        {
            console.log('toggled modal off');
            $scope.addModalOpen=false};
    };
    
    
    
    //update function
    $scope.updateCard = function(){
        //searh for record to update
        var thisCard = $scope.myCards.$getRecord($scope.currentCard.$id);
        
        //set record to update to scope
        thisCard.cardColor = $scope.myColor;
        thisCard.cardName = $scope.myTitle;
        thisCard.cardAttack = $scope.myAttack;
        thisCard.cardDefense = $scope.myDefense;
        thisCard.cardType = $scope.myType;
        thisCard.cardDesc = $scope.myDesc;
        thisCard.cardImg = $scope.myImg;

        //save
        $scope.myCards.$save(thisCard)
            .then(function(){
                console.log('SAVED!');
                //close modal
                $scope.switchAddModal();
        });
    };
    
    //delete function
    $scope.deleteCard = function(){
        //searh for record to update
        var thisCard = $scope.myCards.$getRecord($scope.currentCard.$id);
//        var thisCardInNewest = $scope.newest.$getRecord($scope.currentCard.$id);
//        var thisCardInNumbers = $scope.byNumbers.$getRecord($scope.currentCard.$id);
        
//        console.log(thisCard);
//        console.log(thisCardInNewest);
//        console.log(thisCardInNumbers);
//        console.log($scope.currentCard.$id);
//        console.log($scope.currentCard.cardImg);
//        console.log($scope.currentCard.cardImgSmall);
        
        //set record to be updated to scope
        thisCard.cardColor = $scope.myColor;
        thisCard.cardName = $scope.myTitle;
        thisCard.cardAttack = $scope.myAttack;
        thisCard.cardDefense = $scope.myDefense;
        thisCard.cardType = $scope.myType;
        thisCard.cardDesc = $scope.myDesc;
        thisCard.cardImg = $scope.myImg;

        //remove from my cards
        $scope.myCards.$remove(thisCard)
            .then(function(){
                console.log('DELETED!');
                //close modal
                $scope.switchAddModal();
        });
        
        //remove from cloudinary
        //NEEDS TO BE FROM BACKEND
        
    };
    
    
    
    
}]);
