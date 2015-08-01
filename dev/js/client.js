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
    templateUrl: 'Templates/homeTemplate.html',
  })
  .when('/login', {
    templateUrl: 'Templates/userTemplate.html',
    controller: 'user-controller'
  })
  .when('/surplus', {
    templateUrl: 'Templates/surplusTemplate.html',
    controller: 'surplus-controller'
  })
  .when('/nonprofit', {
    templateUrl: 'Templates/nonprofitTemplate.html',
    controller: 'nonprofit-controller'
  })
    .when('/shipper', {
    templateUrl: 'Templates/shipperTemplate.html',
    controller: 'shipper-controller'
  })
  .otherwise({
    redirectTo: '/home'
    });
}]);

