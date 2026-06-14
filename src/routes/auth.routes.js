const { Router } = require("express");

const controller = require("../controllers/auth.controller");
const {
  validateSignup,
  validateLogin,
  handleValidationErrors,
} = require("../middleware/validation");

const router = Router();

router.get("/signup", controller.getSignup);

router.post(
  "/signup",
  validateSignup,
  handleValidationErrors("auth/signup"),
  controller.postSignup,
);

router.get("/login", controller.getLogin);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors("auth/login"),
  controller.postLogin,
);

router.post("/logout", controller.logout);

module.exports = router;
