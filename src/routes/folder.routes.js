const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");

const controller = require("../controllers/folder.controller");
const { validateFolder } = require("../middleware/validation");
const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);

router.post("/", validateFolder, controller.create);

router.get("/:id", controller.show);

router.get("/:id/edit", controller.edit);

router.put("/:id", validateFolder, controller.update);

router.delete("/:id", controller.delete);

module.exports = router;
