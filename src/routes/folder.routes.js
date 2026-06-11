const { Router } = require("express");

const controller = require("../controllers/folder.controller");
const { isAuthenticated } = require("../middleware/auth");

const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);

router.post("/", controller.create);

router.get("/:id", controller.show);

module.exports = router;
