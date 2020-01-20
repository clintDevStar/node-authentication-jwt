const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
  add: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and Password required!" });
    }

    const user = new User({ name, password }); // document = instance of a model

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(userData => res.json({ userData }))
          .catch(err => console.log(err));
      });
    });
  },
  login: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and Password required!" });
    }

    User.findOne({ name })
      .then(user => {
        return bcrypt.compare(password, user.password);
      })
      .then(match => {
        if (!match) {
          res.status(403).send("Login Successful!");
        }
      })
      .catch(err => {
        console.log("Error authenticating user");
        console.log(err);
        next();
      });
  }
};
