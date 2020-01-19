const controller = require("../controllers/users");

module.exports = router => {
  router.post("/users", controller.add);
};
