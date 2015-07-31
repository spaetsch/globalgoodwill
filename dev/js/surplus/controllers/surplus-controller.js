'use strict';


module.exports = function(app) {
  app.controller('surplus-controller', ['$scope', 'resource', '$cookies', '$http', function($scope, resource, $cookies, $http) {

    var Surplus = resource('surplus'); //this corresponds to URL from routes

    $scope.postItem = function(surplus) {
      console.log("i'm in surplus submitForm");
      Surplus.postItem(surplus, function(response) {
        console.log("surplus call to services");
      });
    };

    $scope.searchSurplus = function(searchReq){
      console.log("in surplus search");
      console.log("searchReq", searchReq);
      Surplus.searchSurplus(searchReq, function(response){
        console.log("surplus search to services");
        console.log("query response", response);
        console.log("query response[0].nonprofitItem", response[0].nonprofitItem);

        $scope.current = -1;
        $scope.results = response;
      });


    };

  }])};
