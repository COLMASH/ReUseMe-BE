const router = require("express").Router();
const categoryController = require("../controller/category.controller");

router.route("/categoryList").get(categoryController.list);
router.route("/categoryDelete").delete(categoryController.destroy);
router.route("/create").post(categoryController.create);

module.exports = router;
