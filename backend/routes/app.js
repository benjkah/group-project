const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/competences/:lan", Controller.getCompetences);

router.get("/applications", 
    Authorization.checkLogin,
    Authorization.checkRecruiter,
    Controller.getAllApplications);

module.exports = router;