const router = require("express").Router();
const adminController = require("../controller/admin.controller");

router.route("/create").post(adminController.create);
router.route("/signin").post(adminController.signin);

module.exports = router;
