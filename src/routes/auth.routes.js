const { Router } = require("express");

const controller = require("../controllers/auth.controller");

const router = Router();

router.get("/signup", controller.getSignup);

module.exports = router;
