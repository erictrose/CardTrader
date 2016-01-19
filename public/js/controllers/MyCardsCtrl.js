app.controller("MyCardsCtrl", ["currentAuth", "$scope", "$firebaseArray", function(currentAuth, $scope, $firebaseArray) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

    
//    //define auth
//    $scope.auth = currentAuth;
    
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
    
//    //link to variables
//    var myCards = $firebaseArray(myCardsRef);
    
    //link to scope
    $scope.myCards = $firebaseArray(myCardsRef);
    
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
            
            console.log(
            
            $scope.myColor,
            $scope.myTitle,
            $scope.myAttack,
            $scope.myDefense,
            $scope.myType,
            $scope.myDesc,
            $scope.myImg,
            $scope.currentCard
            
            );
            
            console.log(
            
            card.cardColor,
            card.cardName,
            card.cardAttack,
            card.cardDefense,
            card.cardType,
            card.cardDesc,
            card.cardImg,
            card
            
            );
            

            
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
    
//            $scope.myColor = '';
//            $scope.myTitle = '';
//            $scope.myAttack = '';
//            $scope.myDefense = '';
//            $scope.myType = '';
//            $scope.myDesc = '';
//            $scope.myImg = '';
//            $scope.currentCard = '';
    };
    
    
    
    //update function
    $scope.updateCard = function(card){
        
        
        console.log($scope.myTitle);
        console.log($scope.myCards);
        console.log($scope.currentCard);
        
//        myCards.$save($scope.currentCard);
        
    };
    
    
    
    
    
    
    
}]);
