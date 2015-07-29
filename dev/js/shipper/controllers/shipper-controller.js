'use strict';

console.log("in surplus-controller.js");

module.exports = function(app) {
  app.controller('surplus-controller', ['$scope', 'resource', function($scope, resource) {

    var Shipper = resource('surplus'); //this corresponds to URL from routes

    $scope.submitForm = function(shipper) {
      console.log("surplus", shipper);
      Shipper.submit(shipper, function(response) {
        console.log("i'm in surplus submitForm");
      });
    };
  }])};
