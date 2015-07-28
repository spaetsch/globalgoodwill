var Surplus     = require('../models/Surplus.js');
var bodyParser  = require('body-parser');
var eat         = require('eat');


module.exports  = function(router, passport) {
  router.use(bodyParser.json());

  router.route('/surplus')
        // '{"itemName":"gotItem","description":"this is an item","originAddress":"a new address","originCity":"Acity","originState":"Astate","originZip":"Azip","originCountry":"Acountry","dateAvailable":"Adate","dateExpires":"AexpireDate"}'
        .post(function(req, res) {
          decodeToken(req.body.token, function(err, data) {

            var newSurplus              = new Surplus();
            newSurplus.userId           = req.body.userId;
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
                console.log(err);
                res.status(500).json({msg: 'server error'});
              }else{
                res.status(200).json({msg: 'Succeed'})
              }

            });
          });
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

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
