// controllers/resortControllers.js

// DEPENDENCIES
const express = require("express");
const resortRouter = express.Router();
const Resort = require("../models/resort");
const Dates = require("../models/date");

// FUNCTIONS USED IN ROUTES
function getResort(id) {
  const resortID = id;
  Resort.findById(resortID).then((resort) => {
    // console.log(resort); // <---- this logs correct resort object
    return resort;
  });
}

// START RESORT ROUTE CONTROLLERS *

// get all resorts
resortRouter.get("/", (req, res) => {
  Resort.find({}).then((resortData) =>
    res.render("index", { resorts: resortData })
  );
});

// view specific resort
// resortRouter.get("/:id", (req, res) => {
//   const id = { _id: req.params.id };
//   Resort.findById(id).then((resort) => {
//     res.render("./pages/showResort", { resort: resort });
//   });
// });

// test route -- view specific resort
resortRouter.get("/:id", (req, res) => {
  const selectedResort = getResort(req.params.id); // <-- need to be able to reference object here
  console.log(selectedResort); // <-- undefined
});

// create new resort
resortRouter.post("/", (req, res) => {
  Resort.create(req.body)
    .then((newResort) => {
      res.json(newResort);
    })
    .catch((err) => console.log(err));
});

// update existing resort by ID
resortRouter.put("/:id", (req, res) => {
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
resortRouter.delete("/:id", (req, res) => {
  const id = { _id: req.params.id };
  Resort.findByIdAndDelete(id).then(res.redirect("/"));
});

// END RESORT ROUTE CONTROLLERS *

module.exports = resortRouter;
