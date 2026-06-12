const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const controller = require("../controllers/file.controller");
const router = Router();

router.use(isAuthenticated);

router.post("/upload/:folderId", upload.single("file"), controller.upload);

module.exports = router;
