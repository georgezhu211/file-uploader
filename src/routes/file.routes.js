const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");

const { validateIdParam } = require("../middleware/validation");
const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.post(
  "/upload/:folderId",
  validateIdParam("folderId"),
  handleUpload,
  controller.upload,
);

router.get("/:id", validateIdParam(), controller.show);

router.get("/:id/download", validateIdParam(), controller.download);

module.exports = router;
