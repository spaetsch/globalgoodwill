var User        = require('../models/user-model.js');
var bodyParser  = require('body-parser');
var eat         = require('eat');

module.exports  = function(router, passport) {
  router.use(bodyParser.json());
  //create a new user
  // '{"username":"myName", "password":"myPass", "organization":"myOrg", "email":"you@you.com","phone":"555-555-5555", "address":"555 5th ave", "city":"seattle", "zip":"55555", "country":"United States", "role":"Squirel"}'
  router.route('/create_user')
        .post(function(req, res) {
          var newUserData             = JSON.parse(JSON.stringify(req.body));
          delete newUserData.username;
          delete newUserData.password;
          var newUser                 = new User(newUserData);
          newUser.basic.username      = req.body.username; //userid sent as token
          newUser.email               = req.body.email;
          newUser.basic.password_hash = newUser.generateHash(req.body.password);
          newUser.organization_name   = req.body.organization;
          newUser.phone               = req.body.phone;
          newUser.address             = req.body.address;
          newUser.city                = req.body.city;
          newUser.zip                 = req.body.zip;
          newUser.country             = req.body.country;
          newUser.role                = req.body.role;

          newUser.save(function(err, user) {
            if (err) {
              console.log(err);
              res.status(500).json({msg: 'server error'});
            }

            user.generateToken(process.env.APP_SECRET, function(err, token) {
              if (err) {
                console.log(err);
                return res.status(500).json({msg: 'error generating token'});
              }

              res.json({token: token, role: newUser.role});
            });
          });
        })
        .get(function(req, res) {
          //req.params.id
          User.find({}, function(err, data) {

            if (err) {
              res.status(500).json({msg: 'failed'})
            }else{
              //res.status(200).json(data);
              res.status(200).json(data);
            }
          });
        })
        .delete(function(req, res) {
          console.log('Deleteing entire collection');
          User.remove({}, function(err, item) {
            if(err){
              res.status(500).json({msg: 'failed'});
            }else{
              res.status(200).json({msg: 'success'});
            }
          });
        });

  // '{"username":"tom", "password":"tomPass"}'
  router.route('/sign_in')
        .post(/*passport.authenticate('basic', {session: false}),*/ function(req, res) {
          User.findOne({ "basic.username": req.body.username })
              .exec(function(err, user){
                generateToken(user._id, function(err, token) {
                  res.status(200).json({token: token, role: user.role});
                });
              });
        });

  function generateToken(id, callback) {
    eat.encode({id: id}, process.env.APP_SECRET, callback);
  };

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}

