const express = require("express");
const Controller = require("../controller/controller");  //controller

const router = express.Router();

router.post("/login", Controller.login);

router.post("/register", Controller.register);

module.exports = router;