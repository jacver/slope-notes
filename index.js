// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dateControllers = require('./controllers/dateControllers');

app.use('/dates', dateControllers);

app.listen(PORT, () => {
  console.log('App listening on PORT ', PORT);
});
