app.factory("Cards", function($firebaseArray, $rootScope){
    var ref = new Firebase("https://card-trader.firebaseio.com/cards/"+$rootScope.currentUser.uid);
    return $firebaseArray(ref);
});