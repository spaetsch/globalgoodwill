'use strict';

console.log("in user-controller.js");

module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', '$cookies', '$http', '$location', function($scope, resource, $cookies, $http, $location) {

    var User = resource('create_user'); //this corresponds to URL from routes

    $scope.getAll = function(){
      User.getAll(function(response){
        console.log("inside getall", response);
        $scope.users = response;
      });
    };

    $scope.submitForm = function(user) {
      console.log("newUser", user);
      User.submit(user, function(response) {
        console.log("i'm in submitForm");
        console.log('resource token', response.token);
        $cookies.put('token', response.token);
        console.log("cookie stored")
        console.log('cookies' ,$cookies.get('token'));
        var responseKey = $cookies.get('token');
        // $http.defaults.headers.common['x-access-token'] = responseKey;
        console.log("this is your cookie please don't lose it "+ responseKey);
        $location.path('/surplus/item')

        //$location.something.path
        //   saveToken();
      });
    };
  //       saveToken(response) {
  //         var token = response.token;
  //         window.localStorage.setItem("login_token", token);
  //         window.localStorage.setItem("login_token", token);
  //         window.location.href = "chat.html";
  // //  };
  }])};
//var token = $cookies.get('token');
  //      $http.defaults.headers.common['x-access-token'] = token;
