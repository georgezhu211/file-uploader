const shareRepository = require("../repositories/share.repository");
const NotFoundError = require("../errors/NotFoundError");
const { matchedData, validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const folder = req.resource;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("folder/show", {
      folder,
      errors: errors.array(),
    });
  }

  const { duration } = matchedData(req);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + duration);

  const share = await shareRepository.create({
    expiresAt,
    folderId: folder.id,
  });

  const shareUrl = `${req.protocol}://${req.get("host")}/share/${share.token}`;
  res.render("share/success", { shareUrl, expiresAt, folderId: folder.id });
};

exports.show = async (req, res) => {
  const share = await shareRepository.findByToken(req.params.token);

  if (!share) {
    throw new NotFoundError("Share link not found");
  }

  res.render("share/show", { share });
};
