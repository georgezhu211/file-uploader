const userRepository = require("../repositories/user.repository");
const passport = require("../config/passport");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = async (req, res, next) => {
  const user = await userRepository.create(req.body);

  req.login(user, (err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};

exports.getLogin = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("auth/login", { error: messages[messages.length - 1] });
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureMessage: true,
});

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
