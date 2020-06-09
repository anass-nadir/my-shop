const router = require("express").Router();
const userCtrl = require("../controllers/users");

router.post("/create", userCtrl.createUser);
router.post("/login", userCtrl.login);
router.get("/check-token", userCtrl.checkToken)
module.exports = router;