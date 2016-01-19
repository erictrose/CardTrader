app.controller("MakeCtrl", ["currentAuth", "$scope", "Upload", "$rootScope", "$routeParams", "$location", "cloudinary", "$firebaseArray",  function(currentAuth, $scope, $upload, $rootScope, $routeParams, $location, cloudinary, $firebaseArray) {
    
    //
    var ref = new Firebase("https://card-trader.firebaseio.com/cards" + currentAuth.uid);
    var myCards = $firebaseArray(ref);
    console.log(myCards);

    //get cards from factory
    $scope.cards = myCards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
        
    //add modal switch
    $scope.addModalOpen = false;
    
    //view modal switch
    $scope.viewModalOpen = false;
    
    //set new card defaults
    $scope.myColor = 'grey';
    $scope.myTitle = '';
    $scope.myAttack = '';
    $scope.myDefense = '';
    $scope.myType = '';
    $scope.myDesc = '';
    $scope.myImg = '';
    $scope.notify = 'select and image';
    
    //add card function
    $scope.switchAddModal = function(){
        //if modal is open, close it, vice verca
        if(!$scope.addModalOpen){$scope.addModalOpen=true}
        else{$scope.addModalOpen=false};
        console.log('toggled modal');
        //reset inputs
        $scope.myColor = 'grey';
        $scope.myTitle = '';
        $scope.myAttack = '';
        $scope.myDefense = '';
        $scope.myType = '';
        $scope.myDesc = '';
        $scope.myImg = '';
        $scope.notify = 'click';
        //reset image
        $scope.files = '';
    };
    
    //view card function
    $scope.switchViewModal = function(card){
        //if modal is open, close it, vice verca
        if(!$scope.viewModalOpen){$scope.viewModalOpen=true}
        else{$scope.viewModalOpen=false};
        $scope.viewColor = card.cardColor;
        $scope.viewTitle = card.cardName;
        $scope.viewType = card.cardType;
        $scope.viewAttack = card.cardAttack;
        $scope.viewDefense = card.cardDefense;
        $scope.viewImg = card.cardImg;
        $scope.viewDesc = card.cardDesc;
        console.log(card);
        console.log('toggled view modal');
    };
    
    //upload file
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            //notify user
            $scope.notify= 'saved';
            //set scope
            $scope.myImg = file.result.secure_url;
            $scope.myImgSmall = file.result.eager[0].secure_url;
            console.log(file);
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    
    //save card
    $scope.saveCard = function(){
        if($scope.myTitle && $scope.myDesc && $scope.myImg){
            //add numbers
            var total = parseInt($scope.myAttack) + parseInt($scope.myDefense);
            //add to firebase
            $scope.cards.$add({
                cardCreator: currentAuth,
                cardName: $scope.myTitle,
                cardAttack: $scope.myAttack,
                cardDefense: $scope.myDefense,
                cardTotal: total,
                cardColor: $scope.myColor,
                cardType: $scope.myType,
                cardImg: $scope.myImg,
                cardImgSmall: $scope.myImgSmall,
                cardDesc: $scope.myDesc
            });
            //log
            console.log('card saved');
            //close modal
            $scope.switchAddModal();
        };
    };
}]);
