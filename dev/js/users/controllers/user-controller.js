//I am the controller for users + login page
'use strict';

module.exports = function(app) {
  app.controller('appController', ['$scope', 'resource', function($scope, resource) {

    var User = resource('users'); //is this the filename or location??

// old submit
    // $scope.submitForm = function(donut) {
    //   console.log(donut.day);
    //   Donut.submit(donut, function(response) {
    //     getAll();
    //   });
    // };

    };
  }])};
