// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const dateRouter = express.Router();
const Resort = require('../models/resort');
const SlopeDay = require('../models/slopeDay');
const ejs = require('ejs');
const resortRouter = require('./resortControllers');

// START DATE ROUTE CONTROLLERS *
// the following routes are prepended with /dates

// GET all runs at X resort on Y date
dateRouter.get('/:formattedDate', (req, res) => {
  const formattedDate = req.params.formattedDate;

  // TODO: refactor below to formattedDate.split("-") which should return an array and each index will be MM, DD, and YYYY :)
  // break up the date
  const targetChars = formattedDate.substring(3, 5);
  const beforeTargetChar = formattedDate.substring(0, 3);
  const afterTargetChar = formattedDate.substring(5);

  // create lower and upper boundaries that straddle the formatted date
  const lowerbound = beforeTargetChar + (targetChars - 1) + afterTargetChar;
  const upperbound =
    beforeTargetChar + (Number(targetChars) + 1) + afterTargetChar;

  SlopeDay.find({
    date: {
      // find docs with dates between the boundaries (THIS SHOULD EQUAL req.params.formattedDate)
      $gte: new Date(lowerbound),
      $lt: new Date(upperbound),
    }, // add 2nd query here
  }).then((dateData) => {
    // console.log(dateData);

    res.render('./pages/showDay', { days: dateData });
  });
});

// VIEW one run (all data, not just card)

// CREATE new run
// // triggered by add run button on specific date (Get route above)

// UPDATE/EDIT one run
// // triggered by EDIT button after expanded

// DELETE one run
// // triggered by DELETE button after expanded

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
