// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const router = express();
// link date model
const ejs = require('ejs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// START DATE ROUTE CONTROLLERS *

router.get('/', (req, res) => {
  res.send('Hello');
});

// END DATE ROUTE CONTROLLERS *

module.exports = router;
