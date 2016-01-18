app.config(["$routeProvider", "cloudinaryProvider",function($routeProvider,cloudinaryProvider) {
$routeProvider
    //make
    .when("/make",{
        controller: "MakeCtrl",
        templateUrl: "views/make.html",
        resolve:{
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //battle
    .when("/battle",{
        controller: "BattleCtrl",
        templateUrl: "views/battle.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //bet
    .when("/bet",{
        controller: "BetCtrl",
        templateUrl: "views/bet.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //trade
    .when("/trade",{
        controller: "TradeCtrl",
        templateUrl: "views/trade.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //profile
    .when("/profile",{
        controller: "ProfileCtrl",
        templateUrl: "views/profile.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth){
                //return Auth.$waitForAuth();
                return Auth.$requireAuth();
            }]
        }
    })
    //otherwise
    .otherwise({redirectTo: '/login'});
cloudinaryProvider
    .set("cloud_name", "dgs2b0bpa")
    .set("upload_preset", "alqlnivc");
}]);