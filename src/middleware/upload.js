const multer = require("multer");
const upload = require("../config/upload");

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      req.uploadError =
        err.code === "LIMIT_FILE_SIZE"
          ? "File is too large (max 10MB)"
          : err.message;
    } else if (err) {
      req.uploadError = err.message;
    }
    next();
  });
};

module.exports = { handleUpload };
