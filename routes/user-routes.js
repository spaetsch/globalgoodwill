var User       = require('../models/user-model.js');

module.exports = function(router) {

  //list all users
  router.get('/', function(request, response) {
    //req.params.id
    User.find({}, function(err, data) {
      
      if (err) {
        response.status(500).json({msg: 'failed'})
      }else{
        //response.status(200).json(data);
        response.status(200).json({msg: 'succeded'});
      }
    });
  });
}

