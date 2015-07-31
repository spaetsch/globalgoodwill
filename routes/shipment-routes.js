 'use strict';

var Shipment   = require('../models/Shipment.js');
var bodyParser  = require('body-parser');
var eat         = require('eat');
var Surplus     = require('../models/Surplus.js');
var NonProfit   = require('../models/Nonprofit.js');
var User        = require('../models/user-model.js');

module.exports  = function(router, passport) {
  router.use(bodyParser.json());

    router.route('/create_shipment')

          .post(function(req, res) {
            console.log(req.body);
            decodeToken(req.body.token, function(err, data) {
              if(err)
                res.status(500).json({msg: "Internal Server Error"});

              var newShipment = new Shipment();
              newShipment.userId = data.id;
              newShipment.originCity = req.body.originCity;
              newShipment.originState = req.body.originState;
              newShipment.originZip = req.body.originZip;
              newShipment.originCountry = req.body.originCountry;
              newShipment.destCity = req.body.destCity;
              newShipment.destState = req.body.destState;
              newShipment.destZip = req.body.destZip;
              newShipment.destCountry = req.body.destCountry;
              newShipment.dateAvailable = req.body.dateAvailable;
              newShipment.dateShipped = req.body.dateShipped;
              newShipment.claimed = req.body.claimed;

              User.findOne({'_id' : data.id})
                .exec(function(err, user){
                  newShipment.orgName = user[0].organization_name;
                  
                  newShipment.save(function(err) {
                    if(err)
                      res.status(500).json({msg: "Internal Server Error"});
                    res.status(200).json({msg: "Success"});
                  });

                });
            });
          })

  router.route('/shipment/origin/:origin/destination/:destination')
        .post(function(req, res) {
          //req.header['token']
          console.log(req.body.token, req.params.origin, req.params.destination);
          decodeToken(req.body.token, function(err, data) {
            if(err){
              res.status(500).json({msg: 'failed'});
            }else{
              Surplus.find({ "originCountry": req.params.origin })
                      .where('claimed').equals(null)
                      .exec(function (err, surplusList) {
                       if(err){
                          res.status(500).json({msg: 'query failed'});
                        }else{
                          NonProfit.find({ "itemNeeded": req.params.destination })
                                   .exec(function (err, nonprofitList){

                                      if(err){
                                        res.status(500).json({msg: 'query failed'});
                                      }else{
                                        //res.status(200).json({ship: shipmentList[0].destCountry,  nonprof: nonprofitList});
                                        var reqArray = [];
                                        for(var i = 0; i < nonprofitList.length; i++){
                                          var containObject = {};
                                          for(var j = 0; j < surplusList.length; j++){ 
                                            if(nonprofitList[i].itemNeeded === surplusList[j].itemName){
                                              
                                              containObject.nonprofitItem = nonprofitList[i].itemNeeded;
                                              containObject.nonprofDesc   = nonprofitList[i].description;
                                              containObject.surplusDesc   = surplusList[i].description
                                              containObject.nonprofitId   = nonprofitList[i]._id;
                                              containObject.surplustId    = surplusList[j]._id;
                                              containObject.nonprofitOrg  = nonprofitList[i].orgName;
                                              containObject.surplusOrg    = surplusList[j].orgName;
                                              
                                              reqArray.push(containObject);
                                            }
                                          }
                                        }

                                        res.status(200).json(reqArray)
                                      }

                                    });
                          }
                        });
            }
          });
        });

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
