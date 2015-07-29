'use strict';

console.log("in surplus-controller.js");

module.exports = function(app) {
  app.controller('surplus-controller', ['$scope', 'resource', function($scope, resource) {

    var Surplus = resource('surplus'); //this corresponds to URL from routes

    $scope.getAll = function(){
      Surplus.getAll(function(response){
        console.log("inside surplus getall", response);
        $scope.users = response;
      });
    };

    $scope.submitForm = function(surplus) {
      console.log("surplus", surplus);
      Surplus.submit(surplus, function(response) {
        console.log("i'm in surplus submitForm");
      });
    };

    $scope.postItem = function(surplus) {
      console.log("surplus post called", surplus);
      Surplus.postItem(surplus, function(response) {
        console.log("i'm in surplus postItem");
      });
    };

  }])};
