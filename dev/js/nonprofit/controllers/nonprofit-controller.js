'use strict';


module.exports = function(app) {
  app.controller('nonprofit-controller', ['$scope', 'resource', function($scope, resource) {

    var Nonprofit = resource('create_nonprofit'); //this corresponds to URL from routes

    $scope.submitForm = function(nonprofit) {
      console.log("nonprofit", nonprofit);
      Nonprofit.postItem(nonprofit, function(response) {
        console.log("i'm in nonprofit submitForm");
      });
    };
  }])};
