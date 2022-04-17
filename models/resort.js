// /db/resort.js

const mongoose = require("../db/connection");

const resortSchema = new mongoose.Schema({
  resortName: String,
});

const Resort = mongoose.model("Resort", resortSchema);

module.exports = Resort;
