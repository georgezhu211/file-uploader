const { prisma } = require("../db/prisma");
const bcrypt = require("bcryptjs");

exports.create = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
  });

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
