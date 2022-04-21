// controllers/dateControllers.js

// DEPENDENCIES
const express = require("express");
const dateRouter = express.Router();
const Resort = require("../models/resort");
const SlopeDay = require("../models/slopeDay");
const ejs = require("ejs");

// START DATE ROUTE CONTROLLERS *
// the following routes are prepended with /dates

// // get all dates JSON
// dateRouter.get("/", (req, res) => {
//   Date.find({}).then((dates) => {
//     res.json(dates);
//   });
// });

// // show specific date JSON
// dateRouter.get('/:strDate', (req, res) => {

// });

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
