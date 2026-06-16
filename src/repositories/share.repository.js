const { prisma } = require("../db/prisma");

exports.create = async ({ expiresAt, folderId }) => {
  const share = await prisma.folderShare.create({
    data: { expiresAt, folderId },
  });

  return share;
};
