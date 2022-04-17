// db/seed.js

const Dates = require("../models/date");
const seedDate = require("./dates.json");

// Dates.deleteMany({})
//   .then(() => {
//     return Dates.collection.insertMany(seedDate);
//   })
//   .then(() => {
//     console.log("dates seeded");
//     process.exit();
//   });

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
