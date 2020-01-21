require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
  add: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password)
      return res.status(400).json({ error: "Name and Password required!" });

    if (name === " " || password === " ")
      return res
        .status(404)
        .json({ error: "Name or Password field must not be an empty space!" });

    const user = new User({ name, password }); // document = instance of a model

    user
      .save()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  login: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and Password required!" });
    }

    User.findOne({ name })
      .then(user => {
        return user;
      })
      .then(user => {
        let userpwd = user.password;
        bcrypt.compare(password, userpwd, (err, match) => {
          if (match) {
            const payload = { user: user.name };
            const options = { expiresIn: "2d", issuer: "clint maruti" };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);
            // console.log(token)
            return res
              .status(200)
              .json({ message: "Login Successful!", token });
          }
          return res
            .status(403)
            .json({ message: "Login Failed!"});
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  },
  getAll: (req, res) => {
    const payload = req.decoded;

    if (payload && payload.user === "admin") {
      User.find({}, (err, users) => {
        if (!err) {
          res.status(200).send(users);
        } else {
          res.status(500).send(err);
        }
      });
    } else {
      res.status(500).send("Authentication Error!");
    }
  }
};
