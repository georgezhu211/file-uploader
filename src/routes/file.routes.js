const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { findFile } = require("../middleware/resource");

const { validateIdParam } = require("../middleware/validation");
const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.get("/:id", validateIdParam(), findFile, controller.show);

router.delete("/:id", validateIdParam(), findFile, controller.delete);

router.get("/:id/download", validateIdParam(), findFile, controller.download);

module.exports = router;
