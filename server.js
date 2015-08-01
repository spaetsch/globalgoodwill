var express       = require('express');
var mongoose      = require('mongoose');
var passport      = require('passport');
require('./lib/passport_strategy')(passport);

var app           = express();
var port          = process.env.PORT || 3000;
var userRoutes    = express.Router();

var path = require('path');

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

// Route setup
app.use(passport.initialize());
var apiRouter = express.Router();
['user', 'surplus', 'shipment', 'nonprofit'].forEach(function(route) {
    require('./routes/' + route + '-routes')(apiRouter, passport)
});
app.use('/api', apiRouter);

var MONGO_URI = process.env.PROD_MONGODB || 'mongodb://localhost/ourclassapp';
mongoose.connect(MONGO_URI, function(err) {
  if(err)
    console.log(err);
  console.log("Successfully connected to MongoDb")
});

//static services
//app.use(express.static(path.join(__dirname, 'build'))); //serve everything inside public directory
app.use(express.static(__dirname + 'build')); //serve everything inside public directory



//listen for requests on port
app.listen(port, function() {
  console.log('Server available at localhost: ' + port);
});
