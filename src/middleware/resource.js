const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const folderRepository = require("../repositories/folder.repository");
const fileRepository = require("../repositories/file.repository");

const findFolder = async (req, res, next) => {
  const folder = await folderRepository.findById(req.params.id);
  if (!folder) return next(new NotFoundError("Folder not found"));
  if (folder.userId !== req.user.id) return next(new ForbiddenError());
  req.resource = folder;
  next();
};

const findFile = async (req, res, next) => {
  const file = await fileRepository.findById(req.params.id);
  if (!file) return next(new NotFoundError("File not found"));
  if (file.folder.userId !== req.user.id) return next(new ForbiddenError());
  req.resource = file;
  next();
};

module.exports = { findFolder, findFile };
