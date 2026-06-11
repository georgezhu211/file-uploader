const { Router } = require("express");

const controller = require("../controllers/auth.controller");

const router = Router();

router.get("/signup", controller.getSignup);

router.post("/signup", controller.postSignup);

router.get("/login", controller.getLogin);

router.post("/login", controller.postLogin);

router.post("/logout", controller.logout);

module.exports = router;
