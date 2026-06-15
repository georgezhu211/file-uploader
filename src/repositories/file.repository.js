const { prisma } = require("../db/prisma");

exports.create = async (data) => {
  const file = await prisma.file.create({ data });

  return file;
};

exports.findById = async (id) => {
  const file = await prisma.file.findUnique({
    where: { id },
    include: { folder: true },
  });

  return file;
};

exports.delete = async (id) => {
  const file = await prisma.file.delete({ where: { id } });

  return file;
};
