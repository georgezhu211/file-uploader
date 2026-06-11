const { prisma } = require("../db/prisma");

exports.create = async ({ name, userId }) => {
  const folder = await prisma.folder.create({ data: { name, userId } });

  return folder;
};

exports.findAllByUserId = async (userId) => {
  const folders = await prisma.folder.findMany({ where: { userId } });

  return folders;
};

exports.findById = async (id) => {
  const folder = await prisma.folder.findUnique({ where: { id } });

  return folder;
};
