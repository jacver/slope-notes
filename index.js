// index.js

require('dotenv').config(); // import dotenv to hide mongoURI from github

const express = require('express'); // import express

const app = express(); // establish app object

const methodOverride = require('method-override'); // import method override for route queries

const PORT = process.env.PORT || 3000; // heroku-friendly port

// import controllers
// ** IMPORTANT ** - dateControllers must be above resortControllers or it will get hung up on the resort get by ID route
const dateControllers = require('./controllers/dateControllers');
const resortControllers = require('./controllers/resortControllers');

app.use(methodOverride('_method')); // utilize method override
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dates', dateControllers);
app.use('/', resortControllers);

app.set('view engine', 'ejs'); // view engine EJS for templating

app.listen(PORT, () => {
  console.log('App listening on PORT ', PORT);
});
