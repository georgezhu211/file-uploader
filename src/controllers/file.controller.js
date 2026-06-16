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
    resourceType: result.resource_type,
    folderId: folder.id,
  });

  res.redirect(`/folders/${folder.id}`);
};

exports.show = async (req, res) => {
  res.render("file/show", { file: req.resource });
};

exports.delete = async (req, res) => {
  const result = await cloudinary.uploader.destroy(req.resource.publicId, {
    resource_type: req.resource.resourceType,
  });

  if (result.result !== "ok") {
    throw new Error("Failed to delete file from Cloudinary");
  }

  await fileRepository.delete(req.resource.id);

  res.redirect(`/folders/${req.resource.folderId}`);
};

exports.download = async (req, res) => {
  const file = req.resource;

  const url = cloudinary.url(file.publicId, {
    resource_type: file.resourceType,
    flags: "attachment",
  });

  res.redirect(url);
};
