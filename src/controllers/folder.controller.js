const folderRepository = require("../repositories/folder.repository");
const cloudinary = require("../config/cloudinary");
const { matchedData, validationResult } = require("express-validator");

exports.index = async (req, res) => {
  const folders = await folderRepository.findAllByUserId(req.user.id);
  res.render("folder/index", { folders });
};

exports.new = async (req, res) => {
  res.render("folder/new");
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("folder/new", {
      errors: errors.array(),
      input: req.body,
    });
  }

  const { name } = matchedData(req);
  const folder = await folderRepository.create({
    name,
    userId: req.user.id,
  });

  res.redirect(`/folders/${folder.id}`);
};

exports.show = async (req, res) => {
  res.render("folder/show", { folder: req.resource });
};

exports.edit = async (req, res) => {
  res.render("folder/edit", { folder: req.resource });
};

exports.update = async (req, res) => {
  const folder = req.resource;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("folder/edit", {
      folder,
      errors: errors.array(),
      input: req.body,
    });
  }

  const { name } = matchedData(req);
  await folderRepository.update(folder.id, { name });

  res.redirect(`/folders`);
};

exports.delete = async (req, res) => {
  const folder = req.resource;

  await Promise.allSettled(
    folder.files.map((file) =>
      cloudinary.uploader.destroy(file.publicId, {
        resource_type: file.resourceType,
      }),
    ),
  );

  await folderRepository.delete(folder.id);

  res.redirect(`/folders`);
};
