const userRepository = require("../repositories/user.repository");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = async (req, res) => {
  const user = await userRepository.create(req.body);

  res.send(user);
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};
