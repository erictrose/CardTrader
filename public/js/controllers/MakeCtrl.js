app.controller("MakeCtrl", ["currentAuth", "$scope", "Upload", "$rootScope", "$routeParams", "$location", "cloudinary", "$firebaseArray", "$firebaseObject",  function(currentAuth, $scope, $upload, $rootScope, $routeParams, $location, cloudinary, $firebaseArray, $firebaseObject) {
    
    //connect to firebase directories
    var myCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/" + currentAuth.uid);
    var newestCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/newest");
    var newestGreenRef = new Firebase("https://card-trader.firebaseio.com/cards/newestGreen");
    var newestBlueRef = new Firebase("https://card-trader.firebaseio.com/cards/newestBlue");
    var newestPurpleRef = new Firebase("https://card-trader.firebaseio.com/cards/newestPurple");
    var newestYellowRef = new Firebase("https://card-trader.firebaseio.com/cards/newestYellow");
    var byNumbersCardsRef = new Firebase("https://card-trader.firebaseio.com/cards/bynumbers").orderByChild("cardTotal");

    //link to variables
    var myCards = $firebaseArray(myCardsRef);
    var newest = $firebaseArray(newestCardsRef);
    var newestGreen = $firebaseObject(newestGreenRef);
    var newestBlue = $firebaseObject(newestBlueRef);
    var newestPurple = $firebaseObject(newestPurpleRef);
    var newestYellow = $firebaseObject(newestYellowRef);
    var byNumbers = $firebaseArray(byNumbersCardsRef);
    
    //link to scope
    $scope.myCards = myCards;
    $scope.newest = newest;
    $scope.newestGreen = newestGreen;
    $scope.newestBlue = newestBlue;
    $scope.newestPurple = newestPurple;
    $scope.newestYellow = newestYellow;
    $scope.byNumbers = byNumbers;
    
    //set new card defaults
    $scope.myColor = 'grey';
    $scope.myTitle = '';
    $scope.myAttack = '';
    $scope.myDefense = '';
    $scope.myType = '';
    $scope.myDesc = '';
    $scope.myImg = '';
    $scope.notify = 'select and image';
 
    //amount of new cards to show
    var newAmount = '100';
    var byNumberAmount = '50';
        
    //add modal switch
    $scope.addModalOpen = false;
    
    //view modal switch
    $scope.viewModalOpen = false;
    
    //go back, needs to be a factory or service or something
    $scope.goTo = function(place){
        $location.path(place);
    };
    
    //switch add modal function
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
    
    //switch view modal function
    $scope.switchViewModal = function(card){
        //if modal is open, close it, vice verca
        if(!$scope.viewModalOpen){
            $scope.viewModalOpen=true;
            
            if(card === 'green'){
                $scope.viewColor = $scope.newestGreen.cardColor;
                $scope.viewTitle = $scope.newestGreen.cardName;
                $scope.viewType = $scope.newestGreen.cardType;
                $scope.viewAttack = $scope.newestGreen.cardAttack;
                $scope.viewDefense = $scope.newestGreen.cardDefense;
                $scope.viewImg = $scope.newestGreen.cardImg;
                $scope.viewDesc = $scope.newestGreen.cardDesc;
            } else if(card === 'blue'){
                $scope.viewColor = $scope.newestBlue.cardColor;
                $scope.viewTitle = $scope.newestBlue.cardName;
                $scope.viewType = $scope.newestBlue.cardType;
                $scope.viewAttack = $scope.newestBlue.cardAttack;
                $scope.viewDefense = $scope.newestBlue.cardDefense;
                $scope.viewImg = $scope.newestBlue.cardImg;
                $scope.viewDesc = $scope.newestBlue.cardDesc;
            } else if(card === 'purple'){
                $scope.viewColor = $scope.newestPurple.cardColor;
                $scope.viewTitle = $scope.newestPurple.cardName;
                $scope.viewType = $scope.newestPurple.cardType;
                $scope.viewAttack = $scope.newestPurple.cardAttack;
                $scope.viewDefense = $scope.newestPurple.cardDefense;
                $scope.viewImg = $scope.newestPurple.cardImg;
                $scope.viewDesc = $scope.newestPurple.cardDesc;
            } else if(card === 'yellow'){
                $scope.viewColor = $scope.newestYellow.cardColor;
                $scope.viewTitle = $scope.newestYellow.cardName;
                $scope.viewType = $scope.newestYellow.cardType;
                $scope.viewAttack = $scope.newestYellow.cardAttack;
                $scope.viewDefense = $scope.newestYellow.cardDefense;
                $scope.viewImg = $scope.newestYellow.cardImg;
                $scope.viewDesc = $scope.newestYellow.cardDesc;
            } else {
                $scope.viewColor = card.cardColor;
                $scope.viewTitle = card.cardName;
                $scope.viewType = card.cardType;
                $scope.viewAttack = card.cardAttack;
                $scope.viewDefense = card.cardDefense;
                $scope.viewImg = card.cardImg;
                $scope.viewDesc = card.cardDesc;
            }
            
            console.log('toggled view modal open');
        }
        else{
            $scope.viewModalOpen=false;
            console.log('toggled view modal closed');
        };   
    };
    
    //upload file (cloudinary)
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
            //total of attack and defense
            var total = parseInt($scope.myAttack) + parseInt($scope.myDefense);

            //ADD TO VARIOUS FIREBASE DIRECTORIES
            
            //add to my cards
            myCards.$add({
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
            
            //add to newest cards
            if($scope.newest.length <= newAmount){
                console.log('newest not full yet, adding');
                newest.$add({
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
            }else{
                console.log('newest full, removoing then adding'); 
                var oneToDelete = newest[0];
                newest.$remove(oneToDelete)
                    .then(
                        newest.$add({
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
                        })
                    );   
            };
            
            //add to bytype db
            if($scope.myColor === 'grey'){   
                
                console.log('not adding to new cards by rarity');
                
            }
            else if($scope.myColor === 'green'){   
                
                newestGreen.cardCreator = currentAuth;
                newestGreen.cardName = $scope.myTitle;
                newestGreen.cardAttack = $scope.myAttack;
                newestGreen.cardDefense = $scope.myDefense;
                newestGreen.cardTotal = total;
                newestGreen.cardColor = $scope.myColor;
                newestGreen.cardType = $scope.myType;
                newestGreen.cardImg = $scope.myImg;
                newestGreen.cardImgSmall = $scope.myImgSmall;
                newestGreen.cardDesc = $scope.myDesc;
                
                newestGreen.$save();
                
            }
            else if($scope.myColor === 'blue'){
                                newestBlue.cardCreator = currentAuth;
                newestBlue.cardName = $scope.myTitle;
                newestBlue.cardAttack = $scope.myAttack;
                newestBlue.cardDefense = $scope.myDefense;
                newestBlue.cardTotal = total;
                newestBlue.cardColor = $scope.myColor;
                newestBlue.cardType = $scope.myType;
                newestBlue.cardImg = $scope.myImg;
                newestBlue.cardImgSmall = $scope.myImgSmall;
                newestBlue.cardDesc = $scope.myDesc;
                
                newestBlue.$save();
            }
            else if($scope.myColor === 'purple'){
                newestPurple.cardCreator = currentAuth;
                newestPurple.cardName = $scope.myTitle;
                newestPurple.cardAttack = $scope.myAttack;
                newestPurple.cardDefense = $scope.myDefense;
                newestPurple.cardTotal = total;
                newestPurple.cardColor = $scope.myColor;
                newestPurple.cardType = $scope.myType;
                newestPurple.cardImg = $scope.myImg;
                newestPurple.cardImgSmall = $scope.myImgSmall;
                newestPurple.cardDesc = $scope.myDesc;
                
                newestPurple.$save();
            }
            else {
                                newestYellow.cardCreator = currentAuth;
                newestYellow.cardName = $scope.myTitle;
                newestYellow.cardAttack = $scope.myAttack;
                newestYellow.cardDefense = $scope.myDefense;
                newestYellow.cardTotal = total;
                newestYellow.cardColor = $scope.myColor;
                newestYellow.cardType = $scope.myType;
                newestYellow.cardImg = $scope.myImg;
                newestYellow.cardImgSmall = $scope.myImgSmall;
                newestYellow.cardDesc = $scope.myDesc;
                
                newestYellow.$save();
            };
            
//            newestGreen.$save({
//                cardCreator: currentAuth,
//                cardName: $scope.myTitle,
//                cardAttack: $scope.myAttack,
//                cardDefense: $scope.myDefense,
//                cardTotal: total,
//                cardColor: $scope.myColor,
//                cardType: $scope.myType,
//                cardImg: $scope.myImg,
//                cardImgSmall: $scope.myImgSmall,
//                cardDesc: $scope.myDesc
//            });
            
            
            //add to bynumbers db
            if($scope.byNumbers.length <= byNumberAmount){
                console.log('byNumbers not full yet, adding');
                byNumbers.$add({
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
            }else{
                console.log('byNumbers full, removoing then adding'); 
                var oneToDelete = byNumbers[0];
                byNumbers.$remove(oneToDelete)
                    .then(
                        byNumbers.$add({
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
                        })
                    );   
            };
            
            
            
            //log
            console.log('card saved');
            //close modal
            $scope.switchAddModal();
        };
    };
}]);
