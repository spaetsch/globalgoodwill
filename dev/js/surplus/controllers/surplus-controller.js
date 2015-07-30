'use strict';


module.exports = function(app) {
  app.controller('surplus-controller', ['$scope', 'resource', '$cookies', '$http', function($scope, resource, $cookies, $http) {

    var Surplus = resource('surplus'); //this corresponds to URL from routes

    $scope.submitForm = function(surplus) {
      console.log("i'm in surplus submitForm");

      // var responseKey = $cookies.get('token');
      // console.log("responseKey", responseKey);
      //   //add it to post request
      // $http.defaults.body.token = responseKey;
      // console.log("surplus after token", surplus);

      Surplus.submit(surplus, function(response) {
        console.log("surplus call to services");
        //getting our cookie ready to send


      });
    };
  }])};
