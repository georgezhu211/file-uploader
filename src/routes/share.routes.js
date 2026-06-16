const { Router } = require("express");

const controller = require("../controllers/share.controller");
const router = Router();

router.get("/:token", controller.show);

module.exports = router;
