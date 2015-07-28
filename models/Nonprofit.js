'use strict';

var mongoose = require('mongoose');

var nonprofitSchema = mongoose.Schema({
  userId: String,
  itemNeeded: String,
  description: String,
  amountNeeded: Number,
  destAddress: String,
  destCity: String,
  destState: String,
  destZip: Number,
  destCountry: String
});

module.exports = mongoose.model('Nonprofit', nonprofitSchema);
