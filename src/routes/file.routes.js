const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.post("/upload/:folderId", upload.single("file"), controller.upload);

router.get("/:id", controller.show);

router.get("/:id/download", controller.download);

module.exports = router;
