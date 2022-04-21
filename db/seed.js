// db/seed.js

const SlopeDay = require("../models/slopeDay");
const seedData = require("./slope-dates.json");

SlopeDay.deleteMany({})
  .then(() => {
    return SlopeDay.insertMany(seedData);
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
//     return Resort.insertMany(seedResort);
//   })
//   .then(() => {
//     console.log("resorts seeded");
//     process.exit();
//   });
