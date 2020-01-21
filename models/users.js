const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

// schema maps to collection
const Schema = mongoose.Schema;

// function for hashing password
const hashPwd = value => {
  return bcrypt.hashSync(value, SALT_ROUNDS)
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
    set: hashPwd
  }
});

module.exports = mongoose.model("User", userSchema);
