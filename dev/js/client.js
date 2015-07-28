//I am client.js

'use strict';

require('angular/angular');

var goodwillApp = angular.module('goodwillApp', []);

// services
require('./services/resource-services')(goodwillApp);

// controllers
require('./users/controllers/user-controller')(goodwillApp);

