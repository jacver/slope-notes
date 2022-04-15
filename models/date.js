// /models/date.js

const mongoose = require('../db/connection');

const dateSchema = new mongoose.Schema({
  resortName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  runName: {
    type: String,
    required: true,
  },
  weatherConditions: String,
  WindConditions: String,
  snowConditions: String,
  runTime: Number,
  runCrowded: Boolean,
  runJumps: Boolean,
  runNotes: String,
});

const Dates = mongoose.model('Date', dateSchema);

module.exports = Dates;
