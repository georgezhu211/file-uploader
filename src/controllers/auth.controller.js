const userRepository = require("../repositories/user.repository");
const passport = require("../config/passport");
const { validationResult, matchedData } = require("express-validator");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("auth/signup", {
      errors: errors.array(),
    });
  }

  const user = await userRepository.create(matchedData(req));

  req.login(user, (err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("auth/login", {
      errors: errors.array(),
    });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).render("auth/login", {
        errors: [{ msg: info.message }],
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
