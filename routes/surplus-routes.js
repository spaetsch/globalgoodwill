var Surplus     = require('../models/Surplus.js');
var bodyParser  = require('body-parser');


module.exports  = function(router, passport) {
  router.use(bodyParser.json());

  router.route('/surplus')
       .get(function(req, res) {
          //req.params.id
          Surplus.find({}, function(err, data) {
            
            if (err) {
              res.status(500).json({msg: 'failed'})
            }else{
              //res.status(200).json(data);
              res.status(200).json(data);
            }
          });
        })



}
