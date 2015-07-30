'use strict';


module.exports = function(app) {
  app.controller('surplus-controller', ['$scope', 'resource', '$cookies', '$http', function($scope, resource, $cookies, $http) {

    var Surplus = resource('surplus'); //this corresponds to URL from routes

    $scope.submitForm = function(surplus) {


      console.log("i'm in surplus submitForm");


      Surplus.postItem(surplus, function(response) {
        console.log("surplus call to services");
        //getting our cookie ready to send


      });
    };
  }])};
