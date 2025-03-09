const express = require("express");
const Controller = require("../controller/controller");  //controller
const Authorization = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", Controller.login);
router.post("/logout", Controller.logout);
router.post("/register", Controller.register);

// Route for fetching all applications
router.get("/applications", Controller.getAllApplications);

/**
 * Route to check if the user is authenticated.
 */
router.get("/auth-check", Authorization.checkAuth);




module.exports = router;