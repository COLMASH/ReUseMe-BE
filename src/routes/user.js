const router = require("express").Router();
const userController = require("../controller/user.controller");
const { auth, formData, userFilter } = require("../utils/middlewares");

router.route("/signup").post(userController.signup);
router.route("/userList").get(userController.list);
router.route("/userInfo").get(auth, userController.show);
// router.route("/userWodsList").get(auth, userController.showWods);
router.route("/userSuscribeItems").put(auth, userController.suscribeItem);
router.route("/userUnsuscribeItems").put(auth, userController.unsuscribeItem);
router.route("/userProfilePic").put(auth, formData, userController.update);
router.route("/userUpdate").put(auth, userFilter, userController.update);
// router.route("/:userId").delete(userController.destroy);
router.route("/signin").post(userController.signin);

module.exports = router;
