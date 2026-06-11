const { prisma } = require("../db/prisma");

exports.create = async ({ username, password }) => {
  const user = await prisma.user.create({ data: { username, password } });

  return user;
};

exports.findByUsername = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } });

  return user;
};

exports.findById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};
