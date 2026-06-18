function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/folders");
  }
  next();
}

module.exports = { isAuthenticated, redirectIfAuthenticated };
