const controller = require("../controllers/users");

module.exports = router => {
  router.post("/users", controller.add);
  router.post("/login", controller.login);
};
