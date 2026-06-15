const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");
const { findFolder, findFile } = require("../middleware/resource");

const { validateIdParam } = require("../middleware/validation");
const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.post(
  "/upload/:id",
  validateIdParam(),
  findFolder,
  handleUpload,
  controller.upload,
);

router.get("/:id", validateIdParam(), findFile, controller.show);

router.get("/:id/download", validateIdParam(), findFile, controller.download);

module.exports = router;
