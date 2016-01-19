app.factory("Users", function($firebaseArray, $firebaseAuth){
    var ref = new Firebase("https://card-trader.firebaseio.com/users");
    return $firebaseArray(ref);
});