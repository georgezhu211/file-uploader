const https = require("https");
const fileRepository = require("../repositories/file.repository");
const cloudinary = require("../config/cloudinary");

exports.upload = async (req, res) => {
  const folder = req.resource;

  if (req.uploadError || !req.file) {
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

  await fileRepository.create({
    name: originalname,
    mimetype,
    size,
    publicId: result.public_id,
    url: result.secure_url,
    folderId: folder.id,
  });

  res.redirect(`/folders/${folder.id}`);
};

exports.show = async (req, res) => {
  res.render("file/show", { file: req.resource });
};

exports.download = async (req, res, next) => {
  const file = req.resource;

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
