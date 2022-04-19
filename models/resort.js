// /db/resort.js

const mongoose = require('../db/connection');

const resortSchema = new mongoose.Schema({
  resortName: { type: String, require: true },
  resortTown: String,
  resortState: String,
  resortCountry: String,
});

const Resort = mongoose.model('Resort', resortSchema);

module.exports = Resort;
