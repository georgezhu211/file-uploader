const { Router } = require("express");

const controller = require("../controllers/auth.controller");
const { redirectIfAuthenticated } = require("../middleware/auth");
const {
  validateSignup,
  validateLogin,
  handleValidationErrors,
} = require("../middleware/validation");

const router = Router();

router.get("/signup", redirectIfAuthenticated, controller.getSignup);

router.post(
  "/signup",
  validateSignup,
  handleValidationErrors("auth/signup"),
  controller.postSignup,
);

router.get("/login", redirectIfAuthenticated, controller.getLogin);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors("auth/login"),
  controller.postLogin,
);

router.post("/logout", controller.logout);

module.exports = router;
