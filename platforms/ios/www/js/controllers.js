angular.module('starter.controllers', [])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends, Camera) {
  $scope.friends = Friends.all();
  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });

    function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";

            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://www.wavi.fr/php/wavi-api/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
        }

    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });

  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
