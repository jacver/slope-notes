// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const resortRouter = express.Router();
const Resort = require('../models/resort');
const Dates = require('../models/date');

// FUNCTIONS USED IN ROUTES

// START RESORT ROUTE CONTROLLERS *

// get all resorts
resortRouter.get('/', (req, res) => {
  Resort.find({}).then((resortData) =>
    res.render('index', { resorts: resortData })
  );
});

// get HTML form to create resort
resortRouter.get('/new', (req, res) => {
  res.render('./pages/newResort');
});

// view specific resort
resortRouter.get('/:resortName', (req, res) => {
  const selectedResort = req.params.resortName; // get name
  res.locals.query = selectedResort; // allows use of selectedResort in template. Reference as "query"

  Dates.find({ resortName: selectedResort }) // locate runs w/ Dates.resortName that matches req param
    .then((dateData) => {
      // console.log(dateData); // passes every document in db.dates with a matching resortName
      res.render('./pages/showResort', { dates: dateData });
    });
});

// post newly created resort
resortRouter.post('/', (req, res) => {
  Resort.create(req.body).then(res.redirect('/resorts'));
});

// NOTE: For now not planning on allowing edits on resort obj
// // update existing resort by ID
// resortRouter.put('/:id', (req, res) => {
//   const id = { _id: req.params.id };
//   Resort.findByIdAndUpdate(id, req.body)
//     .then((updatedResort) => {
//       res.json(updatedResort);
//       // just sending json here so no need to mess with route redirection praise god
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });

// delete existing resort by ID
resortRouter.delete('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndDelete(id).then(res.redirect('/resorts'));
});

// END RESORT ROUTE CONTROLLERS *

module.exports = resortRouter;
