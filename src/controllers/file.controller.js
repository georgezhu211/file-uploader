const https = require("https");
const fileRepository = require("../repositories/file.repository");
const folderRepository = require("../repositories/folder.repository");
const cloudinary = require("../config/cloudinary");

exports.upload = async (req, res) => {
  const folderId = Number(req.params.folderId);

  if (req.uploadError || !req.file) {
    const folder = await folderRepository.findById(folderId);
    return res.status(400).render("folder/show", {
      folder,
      errors: [{ msg: req.uploadError || "Please select a file to upload" }],
    });
  }

  const { originalname, mimetype, size } = req.file;

  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "uploads",
      resource_type: "auto",
    },
  );

  const file = await fileRepository.create({
    name: originalname,
    mimetype,
    size,
    publicId: result.public_id,
    url: result.secure_url,
    folderId,
  });

  res.redirect(`/folders/${folderId}`);
};

exports.show = async (req, res) => {
  const file = await fileRepository.findById(Number(req.params.id));

  res.render("file/show", { file });
};

exports.download = async (req, res, next) => {
  const file = await fileRepository.findById(Number(req.params.id));

  https
    .get(file.url, (fileStream) => {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.name}"`,
      );
      res.setHeader("Content-Type", file.mimetype);
      fileStream.pipe(res);
    })
    .on("error", next);
};
