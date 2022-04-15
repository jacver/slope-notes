// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Resort = require('../models/resort');
const ejs = require('ejs');

// START RESORT ROUTE CONTROLLERS *

// render raw json
// router.get('/', (req, res) => {
//   Resort.find({}).then((resorts) => {
//     res.json(resorts);
//   });
// });

// test ejs template
router.get('/', (req, res) => {
  res.render('index');
});

// END RESORT ROUTE CONTROLLERS *

module.exports = router;
