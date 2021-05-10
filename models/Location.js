const { Decimal128 } = require("bson");
const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  fish: {
    type: String,
    required: true,
  },
  lat: {
    type: Decimal128,
    required: true,
  },
  long: {
    type: Decimal128,
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
