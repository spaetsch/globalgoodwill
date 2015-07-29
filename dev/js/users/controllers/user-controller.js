'use strict';

console.log("in user-controller.js");

module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', function($scope, resource) {

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
      });
    };

  }])};
