'use strict';

angular.module('cardTrader.make', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/make', {
    templateUrl: 'make/make.html',
    controller: 'MakeCtrl',
    resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth){
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
            }]
    }
  });
}])

.controller('MakeCtrl', ["$scope", function($scope){

    $scope.test = 'make test';

}]);