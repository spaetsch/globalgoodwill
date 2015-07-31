'use strict';

module.exports = function(app) {
  app.controller('shipper-controller', ['$scope', 'resource', function($scope, resource) {

    var Shipper = resource('create_shipment'); //this corresponds to URL from routes
    var searchShipper = resource('shipment');

    $scope.postItem = function(shipper) {
      Shipper.postItem(shipper, function(response) {
      console.log("i'm in shipper submitForm");
      });
    };

    $scope.searchShipper = function(searchReq){
      console.log("in shipper search");
      console.log("searchReq", searchReq);
      searchShipper.searchShipper(searchReq, function(response){
        console.log("shipper search to services");
        console.log("response", response)
        $scope.current = -1;
        $scope.results = response;
      });
    };
  }])};
