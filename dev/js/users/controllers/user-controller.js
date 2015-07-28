//I am the controller for users + login page
'use strict';

module.exports = function(app) {
  app.controller('user-controller', ['$scope', 'resource', function($scope, resource) {

    var User = resource('user-model'); //is this the filename or location??

    var getAll = function(){
      User.getAll(function(response){
        console.log("inside getall", response);
        $scope.users = response;
      });
    };
    getAll();

    $scope.submitForm = function(user) {
      User.submit(user, function(response) {

      });
    };

    };
  }])};
