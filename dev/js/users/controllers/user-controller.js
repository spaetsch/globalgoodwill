'use strict';


module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', '$cookies', '$http', '$location', function($scope, resource, $cookies, $http, $location) {

    var User = resource('create_user'); //this corresponds to URL from routes
    var Login= resource('sign_in');

    $scope.getAll = function(){
      User.getAll(function(response){
        console.log("inside getall", response);
        $scope.users = response;
      });
    };

    $scope.submitForm = function(user) {
      console.log("User", user);
      User.submit(user, function(response) {
        console.log("i'm in submitForm");
        console.log('resource token', response.token);
        $cookies.put('token', response.token);
        $cookies.put('role', response.role);
        console.log("cookie stored")
        console.log('cookies' ,$cookies.get('token'));
        //var responseKey = $cookies.get('token');
        // $http.defaults.headers.common['x-access-token'] = responseKey;
        //console.log("this is your cookie please don't lose it "+ responseKey);
        if ($cookies.get('role') === 'surplus')
        $location.path('/surplus')
        if ($cookies.get('role') === 'shipper')
        $location.path('/shipper')
        if ($cookies.get('role') === 'nonprofit')
        $location.path('/nonprofit')
        //$location.something.path
        //   saveToken();
      });
    };

    $scope.submitLogin = function(login) {
      Login.submit(login, function(response) {
        $cookies.put('token', response.token)
        $cookies.put('role', response.role)
        console.log('role',$cookies.get('role'));
        if ($cookies.get('role') === 'surplus')
        $location.path('/surplus')
        if ($cookies.get('role') === 'shipper')
        $location.path('/shipper')
        if ($cookies.get('role') === 'nonprofit')
        $location.path('/nonprofit')
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
