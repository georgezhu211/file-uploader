const { prisma } = require("../db/prisma");

exports.create = async ({ username, password }) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return user;
};
