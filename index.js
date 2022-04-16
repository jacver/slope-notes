// index.js

// import dotenv to hide mongoURI from github
require("dotenv").config();

// import express
const express = require("express");
// establish app object
const app = express();
// heroku-friendly port
const PORT = process.env.PORT || 3000;

// import controllers
const dateControllers = require("./controllers/dateControllers");
const resortControllers = require("./controllers/resortControllers");

// import method override for routing purposes
const methodOverride = require("method-override");
// utilize method override
app.set(methodOverride("_method"));
// view engine EJS for templating
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dates", dateControllers);
app.use("/resorts", resortControllers);

app.listen(PORT, () => {
  console.log("App listening on PORT ", PORT);
});
