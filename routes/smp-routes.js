'use strict';

var bodyParser = require('body-parser');
var User    = require('../models/user-model.js');

console.log("in smp-routes js");

module.exports = function(router) {
  router.use(bodyParser.json());
  console.log("inside module exports for smp routes");
  router.get('/users', function(req, res) {
    console.log('hit the get');
    User.find({}, function(err, data) {
      if (err) {
        console.log(err);
      }
      return res.json(data);
    });
  });

  router.post('/users', function(req, res) {
    console.log('You hit the post')
    var newUser = new User(req.body);
    console.log(req.body);
    newUser.save({}, function(err, data) {
      if (err){
        errorResponse(err, res);
        return;
      }
      res.json(data);
    });
  });


};
