const User = require("../models/users");

module.exports = {
  add: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and Password required!" });
    }

    const user = new User({ name, password }); // document = instance of a model

    user
      .save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
