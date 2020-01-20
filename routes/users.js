const controller = require("../controllers/users");
const validateToken = require('../utils').validateToken;

module.exports = router => {
  router.post("/users", controller.add);
  router.get("/users", validateToken, controller.getAll);
  router.post("/login", controller.login);
};
