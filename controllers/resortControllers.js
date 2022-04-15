// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Resort = require('../models/resort');
const ejs = require('ejs');

// START RESORT ROUTE CONTROLLERS *

router.get('/', (req, res) => {
  Resort.find({}).then((resorts) => {
    res.json(resorts);
  });
});

// END RESORT ROUTE CONTROLLERS *

module.exports = router;
