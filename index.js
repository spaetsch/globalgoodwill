var express       = require('express');
var mongoose      = require('mongoose');

var app           = express();
var port          = process.env.PORT || 3000;
var userRoutes    = express.Router();

// Route setup
var apiRouter = express.Router();
['user'].forEach(function(route) {
    require('./routes/' + route + '-routes')(apiRouter)
});
app.use('/', apiRouter);

//set db path
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/our-class-app');

//listen for requests on port
app.listen(port, function() {
  console.log('Server available at localhost: ' + port);
});


