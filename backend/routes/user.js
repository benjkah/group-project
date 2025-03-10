const express = require("express");
const Controller = require("../controller/controller");
const Authorization = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Defines API routes to handle user profiles, competencies, and applications.
 *
 * - GET /profile: Fetches the user's profile 
 * - DELETE /deleteAvail/:id: Removes an availability 
 * - DELETE /deleteComp/:id: Removes a competence .
 * - POST /addComp: Add  a new competence.
 * - POST /addAvail: Add  a new availability.
 * - GET /applicantProfile/:id: Fetches an applicant's profile .
 * - POST /applicationStatus/:id: Updates the application status .
 */


router.get("/profile", Authorization.checkLogin, Controller.getProfile);
router.delete("/deleteAvail/:id", Controller.deleteAvailability);
router.delete("/deleteComp/:id", Controller.deleteCompetence);
router.post("/addComp", Controller.addCompetence);
router.post("/addAvail", Controller.addAvailability);
router.get("/applicantProfile/:id", Controller.getApplication);
router.post("/applicationStatus/:id", Controller.changeApplicationStatus);

module.exports = router;
