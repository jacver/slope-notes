// /db/resort.js

// **

// before building this out, attempt to hardcode resorts into a seperate collection in the database to be used.

// Will use this depending on outcome/extending app features after MVP.

// **

const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({});

const Resort = mongoose.model('Resort', resortSchema);

module.exports = Resort;
