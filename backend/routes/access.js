const express = require("express");
const Controller = require("../controller/controller");  //controller
const Authorization = require("../middleware/authMiddleware");
const router = express.Router();
/**
 * Defines API routes to handle authentication and application management.
 *
 * - POST /login: Handles user login.
 * - POST /logout: Handles user logout.
 * - POST /register: Handles user registration.
 * - GET /applications: Retrieves all applications.
 * - GET /auth-check: Verifies if the user is authenticated.
 */


router.post("/login", Controller.login);
router.post("/logout", Controller.logout);
router.post("/register", Controller.register);
router.get("/applications", Controller.getAllApplications);
router.get("/auth-check", Authorization.checkAuth);




module.exports = router;