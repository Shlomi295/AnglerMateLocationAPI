const { Double } = require("bson");
const { Decimal128 } = require("bson");
const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  fish: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Location', LocationSchema);
