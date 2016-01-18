app.factory("Auth", function($firebaseAuth){
    var ref = new Firebase("https://card-trader.firebaseio.com");
    return $firebaseAuth(ref);
});