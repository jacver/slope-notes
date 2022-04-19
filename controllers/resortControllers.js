// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const resortRouter = express.Router();
const Resort = require('../models/resort');
const Dates = require('../models/date');

// FUNCTIONS USED IN ROUTES
async function getResort(id) {
  try {
    const resortID = id;
    const selectedResort = await Resort.findById(resortID);
    return selectedResort;
  } catch (err) {
    console.log(err);
  }
}

// START RESORT ROUTE CONTROLLERS *

// get all resorts
resortRouter.get('/', (req, res) => {
  Resort.find({}).then((resortData) =>
    res.render('index', { resorts: resortData })
  );
});

// view specific resort
// resortRouter.get("/:id", (req, res) => {
//   const id = { _id: req.params.id };
//   Resort.findById(id).then((resort) => {
//     res.render("./pages/showResort", { resort: resort });
//   });
// });

// get HTML form to create resort
resortRouter.get('/new', (req, res) => {
  res.render('./pages/newResort').catch((err) => res.send(err));
});

// test route -- view specific resort
resortRouter.get('/:id', async (req, res) => {
  try {
    const selectedResort = await Resort.findById({ _id: req.params.id });
    // console.log(selectedResort);
    const getDates = await Dates.find({
      resortName: { $eq: selectedResort.resortName },
    });
    // console.log(getDates);
  } catch (err) {
    console.log(err);
  }
  // check JSONStringify:
  // https://stackoverflow.com/questions/37287352/can-i-render-multiple-sources-in-ejs
});

// post newly created resort
resortRouter.post('/', (req, res) => {
  console.log('-----In post -----');
  Resort.create(req.body).then(res.redirect('/resorts'));
});

// update existing resort by ID
resortRouter.put('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndUpdate(id, req.body)
    .then((updatedResort) => {
      res.json(updatedResort);
      // just sending json here so no need to mess with route redirection praise god
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// delete existing resort by ID
resortRouter.delete('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndDelete(id).then(res.redirect('/resorts'));
});

// END RESORT ROUTE CONTROLLERS *

module.exports = resortRouter;
