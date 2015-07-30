'use strict';

var mongoose = require('mongoose');

var surplusSchema = mongoose.Schema({
  userId: String,
  itemName: String,
  description: String,
  originAddress: String,
  originCity: String,
  originState: String,
  originZip: Number,
  originCountry: String,
  dateAvailable: Date,
  dateExpires: Date,
  orgName: String,
  claimed: Array
});

module.exports = mongoose.model('Surplus', surplusSchema);
