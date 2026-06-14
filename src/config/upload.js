const multer = require("multer");

const ALLOWED_MIMETYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
      return cb(
        new Error(
          "File type not allowed. Accepted: JPEG, PNG, GIF, WebP, PDF, TXT",
        ),
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
