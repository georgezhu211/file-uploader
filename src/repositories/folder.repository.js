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
  const folder = await prisma.folder.findUnique({ where: { id } });

  return folder;
};

exports.update = async (id, { name }) => {
  const folder = await prisma.folder.update({ where: { id }, data: { name } });

  return folder;
};
