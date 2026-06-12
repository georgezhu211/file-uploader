const fileRepository = require("../repositories/file.repository");

exports.upload = async (req, res) => {
  const folderId = Number(req.params.folderId);
  const { originalname, filename, mimetype, size, path } = req.file;

  const file = await fileRepository.create({
    name: originalname,
    filename,
    mimetype,
    size,
    path,
    folderId,
  });

  res.redirect(`/folders/${folderId}`);
};
