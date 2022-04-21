// /models/date.js

const mongoose = require("../db/connection");

const slopeDaySchema = new mongoose.Schema({
  resortName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  runName: {
    type: String,
    required: true,
  },
  weatherConditions: { type: String, default: "oh my fucking god" },
  windConditions: String,
  snowConditions: String,
  runTime: Number,
  runCrowded: Boolean,
  runJumps: Boolean,
  runNotes: String,
});

const SlopeDay = mongoose.model("SlopeDay", slopeDaySchema);

module.exports = SlopeDay;
