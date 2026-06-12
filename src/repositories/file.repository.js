const { prisma } = require("../db/prisma");

exports.create = async (data) => {
  const file = await prisma.file.create({ data });

  return file;
};
