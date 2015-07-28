'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/user-model');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(username, password, done) {
    User.findOne(username, function(err, user) {
      if(err) return done('database error');

      if(!user) return done('no such user');

      if(!user.checkPassword(password)) return done('wrong password');

      return done(null, user);
    });
  }));
};