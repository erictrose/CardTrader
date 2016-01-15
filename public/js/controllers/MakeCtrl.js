app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", function(currentAuth, $scope, Cards) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
    
    var pushArray = [{},{},{}]
        
    
    
    //dev: add cards to database
    $scope.addCard = function(){
        console.log('this will add the card');
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
        };
    
    
    
}]);