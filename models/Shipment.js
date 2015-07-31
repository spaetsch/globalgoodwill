'use strict';

var mongoose = require('mongoose');

var shipmentSchema = mongoose.Schema({
  userId: String,
  originCity: String,
  originState: String,
  originZip: Number,
  originCountry: String,
  destCity: String,
  destState: String,
  destZip: Number,
  destCountry: String,
  dateAvailable: Date,
  dateShipped: Date,
  orgName: String,
  claimed: Array
});

module.exports = mongoose.model('Shipment', shipmentSchema);
