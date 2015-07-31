'use strict';

module.exports = function(app){
  var errorhandler = function(data){
    console.log(data);
  }

  app.factory('resource', ['$http', '$cookies', function($http, $cookies){
    return function(resourceName){
      return {
        //object that contains functions
        //define based on our controller
        getAll: function(callback){
          $http({
            method: 'GET',
            url: '/' + resourceName
          })
          .success(callback)
          .error(errorhandler);
        },
        submit: function(resource, callback){
          console.log("services submit resourceName ", resourceName);
          console.log("services submit resource ", resource);
          $http({
            method: 'POST',
            url: '/api/' + resourceName,  //needs /api/ to match up with server.js app.use
            data: resource
          })
          .success(callback)
          .error(errorhandler);
          console.log("???");
        },
        postItem: function(resource, callback){
          console.log("services submit resourceName ", resourceName);
          console.log("services submit resource ", resource);
          var responseKey = $cookies.get('token');
          console.log("responseKey", responseKey);
          resource.token = responseKey;
          $http({
            method: 'POST',
            url: '/api/' + resourceName,  //needs /api/ to match up with server.js app.use
            data: resource
          })
          .success(callback)
          .error(errorhandler);
        },
        searchSurplus: function(resource, callback){
          console.log("services search resource ", resource);
          var responseKey = $cookies.get('token');
          console.log("responseKey", responseKey);
          resource.token = responseKey;
          console.log("resource.item", resource.item);
          console.log("resource.item", resource.location);

          var item = resource.item;
          var location = resource.location;

          var reqUrl = '/api/' + resourceName + "/country/" + location  + '/item/' + item;
          console.log("reqUrl", reqUrl);

          $http({
            method: 'POST',
            url: reqUrl,  //needs /api/ to match up with server.js app.use
            data: resource
          })
          .success(callback)
          .error(errorhandler);
        },
        searchNonprofit: function(resource, callback){
          console.log("services search resource ", resource);
          var responseKey = $cookies.get('token');
          console.log("responseKey", responseKey);
          resource.token = responseKey;
          console.log("resource.item", resource.item);
          console.log("resource.item", resource.location);

          var itemNeeded = resource.itemNeeded;
          var destCountry = resource.destCountry;
          //nonprofit/country/:destCountry/item/:itemNeeded
          var reqUrl = '/api/' + resourceName + "/country/" + destCountry  + '/item/' + itemNeeded;
          console.log("reqUrl", reqUrl);

          $http({
            method: 'POST',
            url: reqUrl,  //needs /api/ to match up with server.js app.use
            data: resource
          })
          .success(callback)
          .error(errorhandler);
        }
        searchShipper: function(resource, callback){
          console.log("services search resource ", resource);
          var responseKey = $cookies.get('token');
          console.log("responseKey", responseKey);
          resource.token = responseKey;
          console.log("resource.item", resource.item);
          console.log("resource.item", resource.location);

//NEED ROUTES ??
          var reqUrl = '/api/' + resourceName + "/country/" + destCountry  + '/item/' + itemNeeded;
          console.log("reqUrl", reqUrl);

          $http({
            method: 'POST',
            url: reqUrl,  //needs /api/ to match up with server.js app.use
            data: resource
          })
          .success(callback)
          .error(errorhandler);
        }
      }
    }
  }]);
}
