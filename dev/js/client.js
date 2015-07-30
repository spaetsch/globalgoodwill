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
require('./surplus/controllers/surplus-controller')(goodwillApp);
require('./nonprofit/controllers/nonprofit-controller')(goodwillApp);
require('./shipper/controllers/shipper-controller')(goodwillApp);

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
  .when('/surplus', {
    templateUrl: './templates/surplusTemplate.html',
    controller: 'surplus-controller'
  })
  .when('/nonprofit', {
    templateUrl: './templates/nonprofitTemplate.html',
    controller: 'nonprofit-controller'
  })
    .when('/shipper', {
    templateUrl: './templates/shipperTemplate.html',
    controller: 'shipper-controller'
  })
  .otherwise({
    redirectTo: '/home'
    });
}]);

