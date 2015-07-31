var eat         = require('eat');
var Surplus     = require('../models/Surplus.js');
var NonProfit   = require('../models/Nonprofit.js');
var Shipment    = require('../models/Shipment.js');
var User        = require('../models/user-model.js');
var bodyParser  = require('body-parser');



module.exports  = function(router, passport) {
  router.use(bodyParser.json());

  router.route('/surplus')
        // '{"token": "K2Q3Oafk5oAq5M6xRCjxztO6MoxWxe0yvGEYw/S9rG16","itemName":"gotItem","description":"this is an item","originAddress":"a new address","originCity":"Acity","originState":"Astate","originZip":"Azip","originCountry":"Acountry","dateAvailable":"Adate","dateExpires":"AexpireDate"}'
        .post(function(req, res) {
          decodeToken(req.body.token, function(err, data) {
            console.log('data: ', data, req.body.token);
            //User.findOne(data.id, function(err, user){

              if(err){
                res.status(500).json({msg: 'server error'});
              }else{

                var newSurplus              = new Surplus();
                newSurplus.userId           = data.id;
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

                User.findOne({_id: data.id})
                .exec(function(err, user){
                  newSurplus.orgName = user.organization_name;

                  console.log(newSurplus);

                  newSurplus.save(function(err, user) {
                    if (err) {
                      res.status(500).json({msg: 'server error'});
                    }else{
                      res.status(200).json({msg: 'Succeed'})
                    }
                  });

                });
              }
            //});
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
        // .delete(function(req, res) {
        //   console.log('Deleteing entire collection');
        //   Surplus.remove({}, function(err, item) {
        //     if(err){
        //       res.status(500).json({msg: 'failed'});
        //     }else{
        //       res.status(200).json({msg: 'success'});
        //     }
        //   });
        // });


  //  superagent localhost:3000/api/surplus/72YiOyFuhFTvaZhcdd27Hf7naIGBDIl8qQfRwH8tBQWp/usa/shoes get
  // '{"token":"Tm+F7CjLq0ReeOpAYvd2bx20LXg97VJpSQ1WQHSe445D","location":"usa",itemName":"shoes"}'
  router.route('/surplus/country/:location/item/:item')
        .get(function(req, res) {
          //req.header['token']
          console.log(req.body.token, req.params.location, req.params.item);
          decodeToken(req.body.token, function(err, data) {
            if(err){
              res.status(500).json({msg: 'failed'});
            }else{
              Shipment.find({ "originCountry": req.params.location })
                      .where('claimed').equals(null)
                      .exec(function (err, shipmentList) {
                       if(err){
                          res.status(500).json({msg: 'query failed'});
                        }else{
                          NonProfit.find({ "itemNeeded": req.params.item })
                                   .exec(function (err, nonprofitList){

                                      if(err){
                                        res.status(500).json({msg: 'query failed'});
                                      }else{
                                        //res.status(200).json({ship: shipmentList[0].destCountry,  nonprof: nonprofitList});
                                        var reqArray = [];
                                        for(var i = 0; i < nonprofitList.length; i++){
                                          var containObject = {};
                                          for(var j = 0; j < shipmentList.length; j++){ 
                                            if(nonprofitList[i].destCountry === shipmentList[j].destCountry){
                                              
                                              containObject.nonprofitItem = nonprofitList[i].itemNeeded;
                                              containObject.nonprofDesc   = nonprofitList[i].description;
                                              containObject.nonprofitId   = nonprofitList[i]._id;
                                              containObject.shipmentId    = shipmentList[j]._id;
                                              containObject.nonprofitOrg  = nonprofitList[i].orgName;
                                              containObject.shipmentOrg   = shipmentList[j].orgName;
                                              
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

  router.route('/surplus/claim')
        .post(function(req, res){

        });

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };

  function findUserOrganization(id){
    console.log(id) 
    User.findOne({'_id': id})
    .exec(function(err, user){
      console.log("find", user.organization_name)
      return user.organization_name;
    });
  }
}
