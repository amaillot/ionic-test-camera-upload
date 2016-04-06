// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };


  $scope.uploadPhoto = function() {
      var imageURI        = $scope.lastPhoto;
      var options         = new FileUploadOptions();
      options.fileKey     = "file";

      options.fileName    = imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType    = "image/jpeg";

      var params          = {};
      params.value1       = "test";
      params.value2       = "param";

      options.params      = params;
      options.chunkedMode = false;

      var win = function(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
          alert(r.response);
      };

      var fail = function(error) {
          alert("An error has occurred: Code = " + error.code);
      };

      var ft = new FileTransfer();
      ft.upload(imageURI, "http://www.wavi.fr/php/wavi-api/upload.php", win, fail, options);
  };

});
