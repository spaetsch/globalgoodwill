'use strict';

var Nonprofit   = require('../models/Nonprofit.js');
var User        = require('../models/user-model.js');
var Surplus     = require('../models/Surplus.js');
var Shipment    = require('../models/Shipment.js');
var mongoose    = require('mongoose');
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
              console.log(data.id);
              User.find({_id: data.id})
                  .exec(function(err, obj) {
                    newNonprofit.orgName = obj[0].organization_name;
                    newNonprofit.save(function(err) {
                  if(err)
                    res.status(500).json({msg: "Internal Server Error"});
                  res.status(200).json({msg: "Success"});
                });
              });
            });
         });

    router.route('/nonprofit/country/:destCountry/item/:itemNeeded')
          .get(function(req, res) {
            decodeToken(req.body.token, function(err, data) {
              if(err)
                res.status(500).json({msg: "Internal Server Error"});
              var curCountry = req.params.destCountry;
              var curItem = req.params.itemNeeded;
              Shipment.find({destCountry: curCountry}, {destCountry:0, __v:0})
                .exec(function(err, shipData) {
                  if(err)
                    res.status(500).json({msg: 'failed'});
                  var searchSurplus = Surplus();
                  console.log(shipData[0].originCountry);
                  Surplus.find({itemName: curItem})
                          .where("claimed").equals(null)
                          .exec(function(err, surplusData) {
                            var result = [];
                            if(err)
                              res.status(500).json({msg: "failed"});
                            for(var i = 0; i < shipData.length; i++) {
                              for(var j = 0; j < surplusData.length; j++) {
                                if(shipData[i].originCountry == surplusData[j].originCountry) {
                                  var connect = {};
                                  connect.surplusID = surplusData[j].userId;
                                  connect.shipmentID = shipData[i].userId;
                                  connect.originCountry = surplusData[j].originCountry;
                                  connect.itemName = curItem;
                                  connect.itemDesc = surplusData.description;
                                  connect.shipmentOrg = shipData[i].orgName;
                                  connect.surplusOrg = surplusData[j].orgName;
                                  result.push(connect);
                                }
                              }
                            }
                            res.status(200).json(result);
                          });
                });
            });
          })

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
