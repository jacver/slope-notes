// controllers/dateControllers.js

// DEPENDENCIES
const express = require('express');
const dateRouter = express.Router();
const Resort = require('../models/resort');
const SlopeDay = require('../models/slopeDay');

// START DATE ROUTE CONTROLLERS *
// the following routes are prepended with /date

// GET HTML form to create new
dateRouter.get("/new", (req, res) => {
  Resort.find({}).then((data) => {
    res.render('./pages/newDay', {resorts: data});
  }).catch(console.error)
})

// GET page to UPDATE/EDIT one run
// // triggered by EDIT button in showDay modal
dateRouter.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  // find specific date to edit
  SlopeDay.findById(id)
    .then((dayData) => {
      // get resort data 
      Resort.find({}).then((resortDocs) => {
        // declare resortNames to be passed to html form
        const resortNames = resortDocs.map((item) => item.resortName)
        
        // reformats date from Mongo BEFORE it's sent to form 
        const newDate = ('0' + (dayData.date.getMonth()+1)).slice(-2) + '-' + ('0' + dayData.date.getDate()).slice(-2) + '-' + dayData.date.getFullYear()

        // render edit page with access to specific date, all resort names (for dropdown), and pre-formatted date.
        res.render("./pages/editDay", {day: dayData, resorts: resortNames, formattedDate: newDate});
      })
    }).catch(console.error)
});

// PUT HTML form to UPDATE/EDIT one run
dateRouter.put("/:id", (req, res) => {
  const id = req.params.id
  // locate document to update
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
  ).then((updatedItem) => res.redirect(`/resorts/${updatedItem.resortName}`))
})

// GET all runs at X resort on Y date
dateRouter.get('/:resortName/:formattedDate', (req, res) => {
  const resortName = req.params.resortName
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
      // add 2nd parameter - resortName
    }, resortName: resortName
  }).then((dateData) => {
    res.render('./pages/showDay', { days: dateData });
  }).catch(console.error)
});

// post newly created slope day
dateRouter.post('/', (req, res) => {
  SlopeDay.create(req.body).then(() => res.redirect('/resorts')).catch(console.error)
});

dateRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  SlopeDay.findOneAndDelete({_id: id})
  .then(() => {
    res.redirect("/resorts/")
  }).catch(console.error)
});

// DELETE ALL runs at X resort on Y date
dateRouter.delete('/:resortName/:formattedDate', (req, res) => {
  // must compare resortName && formatted date 
  const resortName = req.params.resortName
  const formattedDate = req.params.formattedDate;

  SlopeDay.deleteMany({"resortName": resortName, "date": formattedDate }).then(() => res.redirect('/resorts/')).catch(console.error)
});

// END DATE ROUTE CONTROLLERS *

module.exports = dateRouter;
