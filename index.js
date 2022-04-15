// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dateControllers = require('./controllers/dateControllers');
const resortControllers = require('./controllers/resortControllers');

const methodOverride = require('method-override');

// app.set("view engine", "ejs")

app.set(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dates', dateControllers);
app.use('/resorts', resortControllers);

app.listen(PORT, () => {
  console.log('App listening on PORT ', PORT);
});
