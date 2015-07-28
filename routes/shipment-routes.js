var Shipment   = require('../models/Shipment.js');
var bodyParser  = require('body-parser');


module.exports  = function(router, passport) {
  router.use(bodyParser.json());
  
   router.route('/non_profit')
         .get(function(req, res) {
            //req.params.id
            Shipment.find({}, function(err, data) {
              
              if (err) {
                res.status(500).json({msg: 'failed'})
              }else{
                //res.status(200).json(data);
                res.status(200).json(data);
              }
            });
          })



}