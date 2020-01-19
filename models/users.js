const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// schema maps to collection
const Schema = mongoose.Schema;

let hashPass = (value) => {
  return bcrypt.hashSync(value)
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    set: hashPass
  }
});

// encrypt password before save


module.exports = mongoose.model("User", userSchema);
