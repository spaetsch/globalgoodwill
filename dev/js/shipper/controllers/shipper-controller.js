'use strict';

console.log("in shipper-controller.js");

module.exports = function(app) {
  app.controller('shipper-controller', ['$scope', 'resource', function($scope, resource) {

    var Shipper = resource('create_shipment'); //this corresponds to URL from routes
    $scope.submitForm = function(shipper) {
      Shipper.postItem(shipper, function(response) {
      console.log("i'm in shipper submitForm");
      });
    };
  }])};
