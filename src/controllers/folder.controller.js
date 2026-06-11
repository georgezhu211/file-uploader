const folderRepository = require("../repositories/folder.repository");

exports.index = async (req, res) => {
  const folders = await folderRepository.findAllByUserId(req.user.id);
  res.render("folder/index", { folders });
};

exports.new = async (req, res) => {
  res.render("folder/new");
};

exports.create = async (req, res) => {
  const folder = await folderRepository.create({
    name: req.body.name,
    userId: req.user.id,
  });

  res.redirect(`/folders/${folder.id}`);
};

exports.show = async (req, res) => {
  const folder = await folderRepository.findById(Number(req.params.id));

  res.render("folder/show", { folder });
};

exports.edit = async (req, res) => {
  const folder = await folderRepository.findById(Number(req.params.id));

  res.render("folder/edit", { folder });
};

exports.update = async (req, res) => {
  await folderRepository.update(Number(req.params.id), {
    name: req.body.name,
  });

  res.redirect(`/folders`);
};
