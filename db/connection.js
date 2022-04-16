const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.Promise = Promise;

const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : process.env.DEV_DB_URL;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then((conn) => {
    console.log(`connected to mongodb on ${conn.connections[0].name} db`);
  })
  .catch((err) => {
    console.error(err);
  });

// Connection Error/Success
db.on("error", (err) => console.log(err.message + " is MongoDB not running?"));
db.on("connected", () => console.log("MongoDB connected on: ", mongoURI));
db.on("disconnected", () => console.log("MongoDB disconnected"));

module.exports = mongoose;
