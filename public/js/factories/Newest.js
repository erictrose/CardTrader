app.factory("Newest", function($firebaseArray){
    var ref = new Firebase("https://card-trader.firebaseio.com/cards/newest");
    return $firebaseArray(ref);
});