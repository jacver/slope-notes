// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Date = require('../models/date');
const ejs = require('ejs');

// START DATE ROUTE CONTROLLERS *

router.get('/', (req, res) => {
  Date.find({}).then((dates) => {
    res.json(dates);
  });
});

// END DATE ROUTE CONTROLLERS *

module.exports = router;
