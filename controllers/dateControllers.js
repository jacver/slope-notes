// controllers/dateControllers.js

// DEPENDENCIES
const express = require("express");
const dateRouter = express.Router();
const Resort = require("../models/resort");
const SlopeDay = require("../models/slopeDay");
const ejs = require("ejs");
const resortRouter = require("./resortControllers");

// HELPER FUNCTIONS

// function formatDate(date) {
//   // change from UNIX to JS Date OBJ
//   const dateObj = new Date(date);
//   // MM-DD-YYYY
//   dateObj.getMonth() +
//     1 +
//     "-" +
//     dateObj.getDate() +
//     "-" +
//     dateObj.getFullYear();
// }

// START DATE ROUTE CONTROLLERS *
// the following routes are prepended with /dates

// // get all dates JSON
// dateRouter.get("/", (req, res) => {
//   Date.find({}).then((dates) => {
//     res.json(dates);
//   });
// });

// // show all same-dates at a specific resort
// dateRouter.get("/:formattedDate", (req, res) => {
// eventually URL should read resorts/:resortName/:date
// // this GET should then display all documents with matching DATE and RESORT NAME on a card

// const formattedDate = req.params.formattedDate;

dateRouter.get("/:formattedDate", (req, res) => {
  const formattedDate = req.params.formattedDate;

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
  }).then((dateData) => res.send(dateData));
});

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
