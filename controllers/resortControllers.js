// controllers/resortControllers.js

// DEPENDENCIES
const express = require('express');
const resortRouter = express.Router();
const Resort = require('../models/resort');

// START RESORT ROUTE CONTROLLERS *

// get all resort JSON
// resortRouter.get('/', (req, res) => {
//   Resort.find({}).then((resorts) => {
//     res.json(resorts);
//   });
// });

// get all resorts
resortRouter.get('/', (req, res) => {
  Resort.find({}).then((resortData) =>
    res.render('./index', { resorts: resortData })
  );
});

// delete existing resort by ID
resortRouter.delete('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndDelete(id).then(res.redirect('/'));
});

// show specific resort JSON
resortRouter.get('/:id', (req, res) => {
  const id = { _id: req.params.id };
  Resort.findById(id).then((resort) => {
    res.json(resort);
  });
});

// create new resort
resortRouter.post('/', (req, res) => {
  Resort.create(req.body)
    .then((newResort) => {
      res.json(newResort);
    })
    .catch((err) => console.log(err));
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

// END RESORT ROUTE CONTROLLERS *

module.exports = resortRouter;
