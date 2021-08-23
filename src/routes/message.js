const router = require("express").Router();
const messageController = require("../controller/message.controller");
const { auth } = require("../utils/middlewares");

router.route("/messageCreate").post(auth, messageController.create);
router.route("/messageList").get(messageController.list);
router.route("/messageInfo").get(auth, messageController.show);
router.route("/messageDelete").delete(messageController.destroy);

module.exports = router;
