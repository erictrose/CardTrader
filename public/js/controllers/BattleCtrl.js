app.controller("BattleCtrl", ["currentAuth", "$scope", function(currentAuth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
    $scope.test = 'battle test';
}]);