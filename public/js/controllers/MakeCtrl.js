app.controller("MakeCtrl", ["currentAuth", "$scope", "Cards", "Upload", function(currentAuth, $scope, Cards, Upload) {

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
    
    //default card color
    $scope.myColor = 'grey';
    
    
    //save card function
    $scope.saveCard = function(){
        //test for validation
            //get user data

//        $scope.cards.$add({
//        cardName: $scope.myTitle,
//        cardAttack: $scope.myAttack,
//        cardDefense: $scope.myDefense,
//        cardTotal: total(),
//        cardColor: $scope.myColor,
//        cardType: $scope.myType,
//        cardImg: '',
//        cardDesc: $scope.myDesc
//        });
        
        
        
        console.log(currentAuth);
        console.log('card saved');
        //close modal
        $scope.switchModal();
    };
    
    
//    #############
    
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
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
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
    
//    #############
    
    
    
    
    
    
    
}]);