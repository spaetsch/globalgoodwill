'use strict';

var express       = require('express');
var mongoose      = require('mongoose');
var app           = express();

var port          = process.env.PORT || 3000;
var userRoutes    = express.Router();

var path = require('path');

// Route setup
//var apiRouter = express.Router();
//['user'].forEach(function(route) {
//    require('./routes/' + route + '-routes')(apiRouter)
//});

app.use('/api', userRoutes);

//set db path
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/our-class-app');

//static services
app.use(express.static(__dirname + '/build')); //serve everything inside public directory

//will need this for router
//require('./routes/routes')(settingsRouter);
//app.use('/', settingsRouter);

//listen for requests on port
app.listen(port, function() {
  console.log('Server available at localhost: ' + port);
});
