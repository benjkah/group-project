const express = require("express");
const Controller = require("../controller/controller");

const router = express.Router();

router.get("/competences", Controller.getCompetences);

router.get("/applications", Controller.getAllApplications);

module.exports = router;