// db/seed.js

const SlopeDay = require("../models/slopeDay");
const seedDate = require("./slope-dates.json");

SlopeDay.deleteMany({})
  .then(() => {
    return SlopeDay.collection.insertMany(seedDate);
  })
  .then((data) => {
    console.log(data);
    console.log("Slope Dates seeded");
    process.exit();
  });

const Resort = require("../models/resort");
const seedResort = require("./resorts.json");

// Resort.deleteMany({})
//   .then(() => {
//     return Resort.collection.insertMany(seedResort);
//   })
//   .then(() => {
//     console.log("resorts seeded");
//     process.exit();
//   });
