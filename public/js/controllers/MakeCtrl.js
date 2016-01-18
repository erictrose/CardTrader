app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", "Upload", "$rootScope", "$routeParams", "$location", "cloudinary",  function(currentAuth, $scope, Cards, $upload, $rootScope, $routeParams, $location, cloudinary) {

    //get cards from factory
    $scope.cards = Cards;
 
    //amount of new cards to show
    $scope.newAmount = '20';
    $scope.ratedAmount = '8';
        
    //modal switch
    $scope.modalOpen = false;
    
    //add card function
    $scope.switchModal = function(){
        //if modal is open, close it, vice verca
        if(!$scope.modalOpen){$scope.modalOpen=true}
        else{$scope.modalOpen=false};
        console.log('toggled modal');
    };
    
    
    
    
    //new card variables
    $scope.myColor = 'grey';
    $scope.myTitle = '';
    $scope.myAttack = 0;
    $scope.myDefense = 0;
    $scope.myType = '';
    $scope.myDesc = '';
    $scope.myImg = '';
    $scope.notify = 'select and image';
    
    
    
    
    
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
              $scope.notify= 'saved';
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
            $scope.switchModal();
        };
    };
    
    

}]);
