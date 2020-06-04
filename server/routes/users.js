const router = require("express").Router();
const UserCtrl = require("../controllers/user");

router.post("/create", UserCtrl.createUser);
router.post("/login", UserCtrl.login);

module.exports = router;
