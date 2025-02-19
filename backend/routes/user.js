const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", Authorization.checkLogin, Controller.getProfile);

module.exports = router;
