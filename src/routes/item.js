const router = require("express").Router();
const itemController = require("../controller/item.controller");
const { auth, itemFilter, formData } = require("../utils/middlewares");

router.route("/itemCreate").post(auth, formData, itemController.create);
router.route("/itemList").get(itemController.list);
router.route("/itemInfo").get(auth, itemController.show);
router.route("/itemSuscribed").get(auth, itemController.showSuscribed);
router.route("/itemUpdate").put(itemFilter, itemController.update);
router.route("/itemDelete").delete(itemController.destroy);

module.exports = router;
