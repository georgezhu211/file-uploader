const { prisma } = require("../db/prisma");

exports.create = async ({ name, userId }) => {
  const folder = await prisma.folder.create({ data: { name, userId } });

  return folder;
};

exports.findAllByUserId = async (userId) => {
  const folders = await prisma.folder.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });

  return folders;
};

exports.findById = async (id) => {
  const folder = await prisma.folder.findUnique({
    where: { id },
    include: {
      files: true,
      shares: {
        where: { expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return folder;
};

exports.update = async (id, { name }) => {
  const folder = await prisma.folder.update({ where: { id }, data: { name } });

  return folder;
};

exports.delete = async (id) => {
  const folder = await prisma.folder.delete({ where: { id } });

  return folder;
};
