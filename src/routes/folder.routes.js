const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { handleUpload } = require("../middleware/upload");
const { findFolder } = require("../middleware/resource");

const shareController = require("../controllers/share.controller");
const folderController = require("../controllers/folder.controller");
const fileController = require("../controllers/file.controller");
const {
  validateFolder,
  validateShare,
  validateIdParam,
  validateTokenParam,
} = require("../middleware/validation");
const router = Router();

router.use(isAuthenticated);

router.get("/", folderController.index);

router.get("/new", folderController.new);

router.post("/", validateFolder, folderController.create);

router.get("/:id", validateIdParam(), findFolder, folderController.show);

router.get("/:id/edit", validateIdParam(), findFolder, folderController.edit);

router.put(
  "/:id",
  validateIdParam(),
  findFolder,
  validateFolder,
  folderController.update,
);

router.delete("/:id", validateIdParam(), findFolder, folderController.delete);

router.post(
  "/:id/files",
  validateIdParam(),
  findFolder,
  handleUpload,
  fileController.upload,
);

router.post(
  "/:id/share",
  validateIdParam(),
  findFolder,
  validateShare,
  shareController.create,
);

router.delete(
  "/:id/share/:token",
  validateIdParam(),
  validateTokenParam(),
  findFolder,
  shareController.destroy,
);

module.exports = router;
