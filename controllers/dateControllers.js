// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const dateRouter = express.Router();
const Resort = require('../models/resort');
const SlopeDay = require('../models/slopeDay');
const ejs = require('ejs');

// HELPER FUNCTIONS

function formatDate(date) {
  // change from UNIX to JS Date OBJ
  const dateObj = new Date(date);
  // MM-DD-YYYY
  dateObj.getMonth() +
    1 +
    '-' +
    dateObj.getDate() +
    '-' +
    dateObj.getFullYear();
}

// START DATE ROUTE CONTROLLERS *
// the following routes are prepended with /dates

// // get all dates JSON
// dateRouter.get("/", (req, res) => {
//   Date.find({}).then((dates) => {
//     res.json(dates);
//   });
// });

// // show specific dates at a specific resort
dateRouter.get('/:formattedDate', (req, res) => {
  const formattedDate = req.params.formattedDate;

  SlopeDay.find({}) // isolate dates
    .then((dateObj) => {
      dateObj.forEach((date, i) => {
        let dateStr =
          // MM-DD-YYYY reformatting to string
          ('0' + (date.date.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + date.date.getDate()).slice(-2) +
          '-' +
          date.date.getFullYear();
        const objWithFormattedDate = dateObj.map((obj) => {
          return { ...obj, formattedDate: dateStr, isNew: true };
        });
        console.log(objWithFormattedDate);
      });
    });
});

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
