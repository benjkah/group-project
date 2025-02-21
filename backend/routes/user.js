const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", Authorization.checkLogin, Controller.getProfile);
router.delete("/deleteAvail/:id", Controller.deleteAvailability);
router.delete("/deleteComp/:id", Controller.deleteCompetence);
router.post("/addComp", Controller.addCompetence);
router.post("/addAvail", Controller.addAvailability);

module.exports = router;
