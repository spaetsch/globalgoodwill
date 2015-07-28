//I am the controller for users + login page
'use strict';

console.log("in user-controller.js");

module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', function($scope, resource) {

    var User = resource('user-model'); //is this the filename or location??

    $scope.getAll = function(){
      User.getAll(function(response){
        console.log("inside getall", response);
        $scope.users = response;
      });
    };

    $scope.submitForm = function(user) {
      User.submit(user, function(response) {

      });
    };

  //  };
  }])};
