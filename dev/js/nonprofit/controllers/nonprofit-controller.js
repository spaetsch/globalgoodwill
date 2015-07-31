'use strict';


module.exports = function(app) {
  app.controller('nonprofit-controller', ['$scope', 'resource', function($scope, resource) {

    var Nonprofit = resource('create_nonprofit'); //this corresponds to URL from routes

    $scope.postItem = function(nonprofit) {
      console.log("nonprofit", nonprofit);
      Nonprofit.postItem(nonprofit, function(response) {
        console.log("i'm in nonprofit submitForm");
      });
    };


    $scope.searchNonprofit = function(searchReq){
      console.log("in surplus search");
      console.log("searchReq", searchReq);
      Nonprofit.searchNonprofit(searchReq, function(response){
        console.log("surplus search to services");
      });
    };
  }])};
