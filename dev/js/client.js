console.log("in client.js");

'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');

var goodwillApp = angular.module('goodwillApp', ['ngRoute', 'ngCookies']);
// services
require('./services/resource-services')(goodwillApp);

// controllers
require('./users/controllers/user-controller')(goodwillApp);

goodwillApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: './templates/homeTemplate.html',
  //   controller: 'appController'
  })
  .when('/login', {
    templateUrl: './templates/userTemplate.html',
    controller: 'user-controller'
  })
<<<<<<< HEAD
  .when('/surplus', {
    templateUrl: './templates/surplusTemplate.html',
    controller: 'user-controller'
=======
    .when('/surplus', {
    templateUrl: './templates/surplusTemplate.html',
    //controller: 'user-controller'
>>>>>>> master
  })
  .otherwise({
    redirectTo: '/home'
    });
}]);

