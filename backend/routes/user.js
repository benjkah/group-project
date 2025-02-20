const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", Authorization.checkLogin, Controller.getProfile);
router.delete("/deleteAvail/:id", Controller.deleteAvailability);
router.delete("/deleteComp/:id", Controller.deleteCompetence);

module.exports = router;
