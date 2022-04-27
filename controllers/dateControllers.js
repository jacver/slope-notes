// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const dateRouter = express.Router();
const Resort = require('../models/resort');
const SlopeDay = require('../models/slopeDay');
const ejs = require('ejs');
const resortRouter = require('./resortControllers');

// START DATE ROUTE CONTROLLERS *

// the following routes are prepended with /date

// GET HTML form to create new
dateRouter.get("/new", (req, res) => {
  Resort.find({}).then((data) => {
    res.render('./pages/newDay', {resorts: data});
  })
})


// GET page to UPDATE/EDIT one run
// // triggered by EDIT button in showDay modal
dateRouter.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  SlopeDay.findById(id)
    .then((dayData) => {
      Resort.find({}).then((resortDocs) => {
        const resortNames = resortDocs.map((item) => item.resortName)

        res.render("./pages/editDay", {day: dayData, resorts: resortNames});
      })
    })
});

// PUT HTML form to UPDATE/EDIT one run
dateRouter.put("/:id", (req, res) => {
  const id = req.params.id

  SlopeDay.findOneAndUpdate(
    {_id: id},
    {
      resortName: req.body.resortName,
      date: req.body.date,
      runName: req.body.runName,
      runDifficulty: req.body.runDifficulty,
      weatherConditions: req.body.weatherConditions,
      windConditions: req.body.windConditions,
      snowConditions: req.body.snowConditions,
      runTime: req.body.runtime 
    },
    {new: true}
  ).then((updatedItem) => { () => 
    // what to pass in here?
    res.render("./pages/showDay")
  })
 
})

// GET all runs at X resort on Y date
dateRouter.get('/:resortName/:formattedDate', (req, res) => {
  const resortName = req.params.resortName
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
    }, resortName: resortName
  }).then((dateData) => {
    res.render('./pages/showDay', { days: dateData });
  });
});



// post newly created slope day
dateRouter.post('/', (req, res) => {
  SlopeDay.create(req.body).then(() => res.redirect('/resorts'));
  // this is a redirect NOT a render, no need to pass anything?? Want to redirect to show resort route somehow
});


dateRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  SlopeDay.findOneAndDelete({_id: id})
  .then(() => {
    res.redirect("/resorts/")
  })

  SlopeDay.deleteMany({"resortName": resortName, "date": formattedDate }).then(() => res.redirect('/resorts/'));
});


// DELETE ALL runs at X resort on Y date
dateRouter.delete('/:resortName/:formattedDate', (req, res) => {
  // must compare resortName && formatted date 
  const resortName = req.params.resortName
  const formattedDate = req.params.formattedDate;

  SlopeDay.deleteMany({"resortName": resortName, "date": formattedDate }).then(() => res.redirect('/resorts/'));
});

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
