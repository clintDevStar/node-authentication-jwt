const mongoose = require("mongoose");
const config = require("config");

//db options
let options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

//db connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;
