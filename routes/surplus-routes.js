var Surplus     = require('../models/Surplus.js');
var User        = require('../models/user-model.js');
var bodyParser  = require('body-parser');
var eat         = require('eat');


module.exports  = function(router, passport) {
  router.use(bodyParser.json());

  router.route('/surplus')
        // '{"itemName":"gotItem","description":"this is an item","originAddress":"a new address","originCity":"Acity","originState":"Astate","originZip":"Azip","originCountry":"Acountry","dateAvailable":"Adate","dateExpires":"AexpireDate"}'
        .post(function(req, res) {

          //I AM A HACKED VERSION OF ROUTES FOR TESTING PURPOSES

         // decodeToken(req.body.token, function(err, data) {
            console.log('data: ', req.body.token);
            //User.findOne(data.id, function(err, user){

              //if(err){
              //  res.status(500).json({msg: 'server error'});
              //}else{

                var newSurplus              = new Surplus();
                newSurplus.userId           = req.body.token; //data.id;
                newSurplus.itemName         = req.body.itemName;
                newSurplus.description      = req.body.description;
                newSurplus.originAddress    = req.body.originAddress;
                newSurplus.originCity       = req.body.originCity;
                newSurplus.originState      = req.body.originState;
                newSurplus.originZip        = req.body.originZip;
                newSurplus.originCountry    = req.body.originCountry;
                newSurplus.dateAvailable    = req.body.dateAvailable;
                newSurplus.dateExpires      = req.body.dateExpires;
                newSurplus.claimed          = req.body.claimed;

                newSurplus.save(function(err, user) {
                  if (err) {
                    res.status(500).json({msg: 'server error'});
                  }else{
                    res.status(200).json({msg: 'Succeed'})
                  }
                });
              //}
            //});
          //});
        })
        .get(function(req, res) {
          //req.params.id
          //Surplus.decodeToken(process.env.APP_SECRET, function(err, token) {
            Surplus.find({}, function(err, data) {

              if (err) {
                res.status(500).json({msg: 'failed'})
              }else{
                //res.status(200).json(data);
                res.status(200).json(data);
              }
            });
          //});
        })
        .delete(function(req, res) {
          console.log('Deleteing entire collection');
          Surplus.remove({}, function(err, item) {
            if(err){
              res.status(500).json({msg: 'failed'});
            }else{
              res.status(200).json({msg: 'success'});
            }
          });
        });

  // '{"token":"Tm+F7CjLq0ReeOpAYvd2bx20LXg97VJpSQ1WQHSe445D", "itemName":"shoes"}'
  router.route('/surplus/item')
        .post(function(req, res) {
          decodeToken(req.body.token, function(err, data) {
            if(err){
              console.log(data)
              res.status(500).json({msg: 'failed'});
            }else{
              var query = Surplus.find({ "itemName": req.body.itemName });
              query.exec(function (err, item) {
               if(err){
                  res.status(500).json({msg: 'query failed'});
                }else{
                  res.status(200).json(item);
                }
              });
            }
          });
        });

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
