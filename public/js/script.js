/////////////
//SCRIPT.JS//
/////////////

/*

app name: cardTrader
dependencies: firebase
controllers: mainCtrl

*/

var cardTrader = angular.module("cardTrader", ["firebase"]);
///////////////////
//MAIN CONTROLLER//
///////////////////

/*
scoped variables:
image
imageFileName
uploadme
login()
    authData
    error
cards
newestByType
addCard()
*/

cardTrader.controller("mainCtrl", ["$scope", "$firebaseArray", "$firebaseAuth",
function($scope, $firebaseArray, $firebaseAuth){
    ////////////////
    //IMAGE UPLOAD//
    ////////////////
    $scope.image = null;
    $scope.imageFileName = '';
    $scope.uploadme = {};
    $scope.uploadme.src = '';
    ////////////
    //FIREBASE//
    ////////////
    var firebaseAuth = new Firebase("https://cardtraderdb.firebaseio.com");
    var firebaseCards = new Firebase("https://cardtraderdb.firebaseio.com/cards");
    var auth = $firebaseAuth(firebaseAuth);
    $scope.cards = $firebaseArray(firebaseCards);
    $scope.newestByType = $firebaseArray(firebaseCards);
    //LOGIN FUNCTION
    $scope.ghLogin = function(){
        firebaseAuth.authWithOAuthPopup("github", function(error, authData){
        if (error){
            console.log("Login Failed!", error);
        }else{
            console.log("Authenticated successfully with payload:", authData);
            //do login stuff
            $scope.userData = authData;
            $scope.$apply();
        }
    })};
    //ADD CARD FUNCTION
    $scope.addCard = function(e){
        //if all card inputs are filled out
        if ($scope.cardName && $scope.userData!=null){
            //set variables, allow defaults
            var cardName = $scope.cardName || "new card",
                cardType = $scope.cardType || "basic",
                cardDesc = $scope.cardDesc || "no description",
                cardImg = $scope.cardImg || "http://i.imgur.com/MFQyJeD.png",
                cardAttack = $scope.cardAttack || 0,
                cardDefense = $scope.cardDefense || 0,
                cardColor = $scope.cardColor || "lightgrey",
                thisTime = new Date,
                createTime = thisTime.getTime();
            //add to firebase object
            $scope.cards.$add({
                cardName: cardName,
                cardType: cardType,
                cardDesc: cardDesc,
                cardImg: cardImg,
                cardAttack: cardAttack,
                cardDefense: cardDefense,
                cardColor: cardColor,
                createTime: createTime
            });
            //reset values
            $scope.cardName = "";
            $scope.cardType = "";
            $scope.cardDesc = "";
            $scope.cardImg = "";
            $scope.cardAttack = "";
            $scope.cardDefense = "";
        }
    }
}
]);
///////////////////////////////
//DIRECTIVES FOR IMAGE UPLOAD//
///////////////////////////////
cardTrader.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function(scope, element, attrs) {
      var checkSize,
          isTypeValid,
          processDragOverOrEnter,
          validMimeTypes;
      
      processDragOverOrEnter = function (event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      
      validMimeTypes = attrs.fileDropzone;
      
      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.file = evt.target.result;
              if (angular.isString(scope.fileName)) {
                return scope.fileName = name;
              }
            });
          }
        };
        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        return false;
      });
    }
  };
})


.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);