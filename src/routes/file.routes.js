const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");

const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.post("/upload/:folderId", handleUpload, controller.upload);

router.get("/:id", controller.show);

router.get("/:id/download", controller.download);

module.exports = router;
