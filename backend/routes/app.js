const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");
const router = express.Router();



/**
 * Defines API routes for competences and applications.
 * - GET /competences/:lan: Retrieves competences based on language.
 * - GET /applications: Retrieves all applications (requires login and recruiter role).
 */

router.get("/competences/:lan", Controller.getCompetences);

router.get("/applications", 
    Authorization.checkLogin,
    Authorization.checkRecruiter,
    Controller.getAllApplications);

module.exports = router;