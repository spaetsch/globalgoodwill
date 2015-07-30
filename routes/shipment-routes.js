 'use strict';

var Shipment   = require('../models/Shipment.js');
var bodyParser  = require('body-parser');
var eat = require('eat');

module.exports  = function(router, passport) {
  router.use(bodyParser.json());

    router.route('/create_shipment')

          .post(function(req, res) {
            console.log(req.body);

            //I AM A HACKED VERSION OF ROUTES FOR TESTING PURPOSES

          //  decodeToken(req.body.token, function(err, data) {
          //    if(err)
          //      res.status(500).json({msg: "Internal Server Error"});

              var newShipment = new Shipment();
              newShipment.userId = req.body.token; //data.id;
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

              newShipment.save(function(err) {
                if(err)
                  res.status(500).json({msg: "Internal Server Error"});
                res.status(200).json({msg: "Success"});
              });
           // });
          })

          .get(function(req, res) {
            //req.params.id
            Shipment.find({}, function(err, data) {
              if (err)
                res.status(500).json({msg: 'failed'})

              res.status(200).json(data);
            })
          })

  function decodeToken(token, callback) {
    eat.decode(token, process.env.APP_SECRET, callback);
  };
}
