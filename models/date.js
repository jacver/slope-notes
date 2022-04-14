// /models/date.js

const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  resortName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
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

const Date = mongoose.model('Date', dateSchema);

module.exports = Date;
