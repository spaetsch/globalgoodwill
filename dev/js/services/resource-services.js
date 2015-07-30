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
          console.log("???");
        }
      }
    }
  }]);
}
