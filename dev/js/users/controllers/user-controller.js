//I am the controller for users + login page
'use strict';

console.log("in user-controller.js");

module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', function($scope, resource) {

    var User = resource('users'); //is this the filename or location??

    $scope.getAll = function(){
      User.getAll(function(response){
        console.log("inside getall", response);
        $scope.users = response;
      });
    };

    $scope.submitForm = function(user) {
      console.log("i'm trying to get to submitForm. Help?");
      console.log("newUser", user);
      console.log("User ", User);
      User.submit(user, function(response) {
        console.log("i'm in submitForm");
      });
    };

  //  };
  }])};
