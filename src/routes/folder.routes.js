const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");

const controller = require("../controllers/folder.controller");
const { validateFolder, validateIdParam } = require("../middleware/validation");
const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);

router.post("/", validateFolder, controller.create);

router.get("/:id", validateIdParam(), controller.show);

router.get("/:id/edit", validateIdParam(), controller.edit);

router.put("/:id", validateIdParam(), validateFolder, controller.update);

router.delete("/:id", validateIdParam(), controller.delete);

module.exports = router;
