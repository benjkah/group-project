const express = require("express");
const Controller = require("../controller/controller");

const router = express.Router();

router.get("/competences", Controller.getCompetences);

module.exports = router;