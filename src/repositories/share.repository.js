const { prisma } = require("../db/prisma");

exports.create = async ({ expiresAt, folderId }) => {
  const share = await prisma.folderShare.create({
    data: { expiresAt, folderId },
  });

  return share;
};

exports.findByToken = async (token) => {
  const share = await prisma.folderShare.findFirst({
    where: { token, expiresAt: { gt: new Date() } },
    include: { folder: { include: { files: true } } },
  });

  return share;
};

exports.deleteByToken = async (token, folderId) => {
  return prisma.folderShare.deleteMany({
    where: { token, folderId },
  });
};
