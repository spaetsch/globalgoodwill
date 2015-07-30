'use strict';

var Nonprofit   = require('../models/Nonprofit.js');
var bodyParser  = require('body-parser');
var eat         = require('eat');


module.exports  = function(router, passport) {
  router.use(bodyParser.json());

   router.route('/create_nonprofit')

         .post(function(req, res) {
            console.log(req.body);
            decodeToken(req.body.token, function(err, data) {
              if(err)
                res.status(500).json({msg: "Internal Server Error"});

              var newNonprofit    = new Nonprofit();
              newNonprofit.userId = data.id;
              newNonprofit.itemNeeded = req.body.itemNeeded;
              newNonprofit.description = req.body.description;
              newNonprofit.amountNeeded = req.body.amountNeeded;
              newNonprofit.destAddress = req.body.destAddress;
              newNonprofit.destCity = req.body.destCity;
              newNonprofit.destState = req.body.destState;
              newNonprofit.destZip = req.body.destZip;
              newNonprofit.destCountry = req.body.destCountry;

              newNonprofit.save(function(err) {
                if(err)
                  res.status(500).json({msg: "Internal Server Error"});
                res.status(200).json({msg: "Success"});
              });
            })
         })

    router.route('/nonprofit/token/:token/country/:destCountry/item/:item')
         .get(function(req, res) {
            //req.params.id
            Nonprofit.find({}, function(err, data) {

              if (err) {
                res.status(500).json({msg: 'failed'})
              }else{
                //res.status(200).json(data);
                res.status(200).json(data);
              }
            });
          })

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
