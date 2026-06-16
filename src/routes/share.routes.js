const { Router } = require("express");

const controller = require("../controllers/share.controller");
const { validateTokenParam } = require("../middleware/validation");
const router = Router();

router.get("/:token", validateTokenParam(), controller.show);

module.exports = router;
