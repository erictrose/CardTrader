app.factory("Cards", function($firebaseArray){
    var ref = new Firebase("https://card-trader.firebaseio.com/cards");
    return $firebaseArray(ref);
});