const { prisma } = require("../db/prisma");

exports.create = async ({ name, userId }) => {
  const folder = await prisma.folder.create({ data: { name, userId } });

  return folder;
};
