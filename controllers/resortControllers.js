// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const resortRouter = express.Router();
const Resort = require('../models/resort');
const SlopeDay = require('../models/slopeDay');

// START RESORT ROUTE CONTROLLERS *
// these routes are prepended with /resorts/

// get all resorts
resortRouter.get('/', (req, res) => {
  Resort.find({}).then((resortData) =>
    res.render('index', { resorts: resortData })
  ).catch(console.error)
});

// get HTML form to create resort
resortRouter.get('/new', (req, res) => {
  Resort.find({}).then((data) => {
    res.render('./pages/newResort', {resorts: data});
  }).catch(console.error)
});

// view specific resort
resortRouter.get('/:resortName', (req, res) => {
  const selectedResort = req.params.resortName; // get name
  res.locals.query = selectedResort; // allows use of selectedResort in template. Reference as "query"

  SlopeDay.find({ resortName: selectedResort }) // locate runs w/ Dates.resortName that matches req param
    .then((dateData) => {
      // empty arrays to hold filtered data
      const filteredDates = []
      const filteredActualData = []

      // if the date does not exist within the array, push it into the array
      dateData.forEach((oneDate, i) => {
        if(!filteredDates.includes(oneDate.date.toString())) {
          // must use toString(), cannot compare objects
          filteredDates.push(oneDate.date.toString());
          filteredActualData.push(oneDate);
        }
      })
      // pass filtered data to prevent duplicate cards
      res.render('./pages/showResort', { dates: filteredActualData });
    }).catch(console.error)
});

// post newly created resort
resortRouter.post('/', (req, res) => {
  Resort.create(req.body).then(() => res.redirect('/resorts')).catch(console.error)
});

// delete existing resort by ID
resortRouter.delete('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndDelete(id).then(res.redirect('/resorts')).catch(console.error)
});

// END RESORT ROUTE CONTROLLERS *

module.exports = resortRouter;
