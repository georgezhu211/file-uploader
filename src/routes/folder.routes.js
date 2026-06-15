const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { findFolder } = require("../middleware/resource");

const controller = require("../controllers/folder.controller");
const { validateFolder, validateIdParam } = require("../middleware/validation");
const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);

router.post("/", validateFolder, controller.create);

router.get("/:id", validateIdParam(), findFolder, controller.show);

router.get("/:id/edit", validateIdParam(), findFolder, controller.edit);

router.put(
  "/:id",
  validateIdParam(),
  findFolder,
  validateFolder,
  controller.update,
);

router.delete("/:id", validateIdParam(), findFolder, controller.delete);

module.exports = router;
