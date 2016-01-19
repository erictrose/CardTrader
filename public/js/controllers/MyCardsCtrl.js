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
    
    //go back, needs to be a factory or service or something
    $scope.goBack = function(){
        window.history.back();
    }
    
    //add modal switch
    $scope.addModalOpen = false;
    
    //view modal switch
    $scope.viewModalOpen = false;
    
//    //switch view modal function
//    $scope.switchViewModal = function(card){
//        //if modal is open, close it, vice verca
//        if(!$scope.viewModalOpen){$scope.viewModalOpen=true}
//        else{$scope.viewModalOpen=false};
//        $scope.viewColor = card.cardColor;
//        $scope.viewTitle = card.cardName;
//        $scope.viewType = card.cardType;
//        $scope.viewAttack = card.cardAttack;
//        $scope.viewDefense = card.cardDefense;
//        $scope.viewImg = card.cardImg;
//        $scope.viewDesc = card.cardDesc;
//        console.log(card);
//        console.log('toggled view modal');
//    };
    
    //switch add modal function
    $scope.switchAddModal = function(card){
        //if modal is open, close it, vice verca
        if(!$scope.addModalOpen){$scope.addModalOpen=true}
        else{$scope.addModalOpen=false};
        console.log('toggled modal');
        
        //
        $scope.myColor = card.cardColor;
        $scope.myTitle = card.cardName;
        $scope.myAttack = card.cardAttack;
        $scope.myDefense = card.cardDefense;
        $scope.myType = card.cardType;
        $scope.myDesc = card.cardDesc;
        $scope.myImg = card.cardImg;
//        $scope.notify = 'click';
        //
//        $scope.files = '';
    };
    
    
    
    
    
    
    
}]);
