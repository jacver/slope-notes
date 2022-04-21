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

// // show specific date JSON
dateRouter.get('/:formattedDate', (req, res) => {
  const formattedDate = req.params.formattedDate; // get name
  res.locals.query = formattedDate; // allows use of formattedDate in template. Reference as "query"

  SlopeDay.find({}, { date: 1, _id: 0 }) // isolate dates
    .then((dateObj) => {
      // needs to be
      console.log(dateObj);
    });
});

// create new resort
//  **IMPORTANT** when creating new resort, pass date as YYYY-MM-DD string and mongoDB will use Date() to create it as a date
// dateRouter.post("/", (req, res) => {
//   Date.create(req.body)
//     .then((newDate) => {
//       res.json(newDate);
//     })
//     .catch((err) => console.log(err));
// });

// update existing Date by ID
// dateRouter.put("/:id", (req, res) => {
//   const id = { _id: req.params.id };
//   Date.findByIdAndUpdate(id, req.body)
//     .then((updatedDate) => {
//       res.json(updatedDate);
//       // just sending json here so no need to mess with route redirection praise god
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });

// // delete existing Date by ID
// dateRouter.delete("/:id", (req, res) => {
//   const id = { _id: req.params.id };
//   Date.findByIdAndDelete(id, (err, deletedDate) => {
//     err ? console.log(err) : console.log("DELETED: ", deletedDate);
//   });
// });

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
