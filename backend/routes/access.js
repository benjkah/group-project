const express = require("express");
const Controller = require("../controller/controller");  //controller

const router = express.Router();

router.post("/login", Controller.login);

module.exports = router;