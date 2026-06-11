const folderRepository = require("../repositories/folder.repository");

exports.new = async (req, res) => {
  res.render("folder/new");
};

exports.create = async (req, res) => {
  const folder = await folderRepository.create({
    name: req.body.name,
    userId: req.user.id,
  });

  res.send(folder);
};
