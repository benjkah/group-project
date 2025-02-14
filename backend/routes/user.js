const express = require('express');
const router = express.Router();
const { executeQuery } = require("../database.js");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/profile", authenticateUser, async (req, res) => {
  const person_id = req.person_id; // Get from authenticated session

  try {
      const query = `
          SELECT person_id, name, surname, email
          FROM [dbo].[person]
          WHERE person_id = @person_id
      `;
      const result = await executeQuery(query, [person_id], ["person_id"], false);

      if (result.recordset.length === 0) {
          return res.status(404).json({ message: "Profile not found." });
      }

      let userProfile = result.recordset[0];

      // Fetch competencies dynamically
      const competenceQuery = `
          SELECT cp.competence_id, c.name, cp.years_of_experience
          FROM [dbo].[competence_profile] cp
          JOIN [dbo].[competence_translation] c ON cp.competence_id = c.competence_id
          WHERE cp.application_id = @person_id
      `;
      const competenceResult = await executeQuery(competenceQuery, [person_id], ["person_id"], false);

      // Fetch availability dynamically
      const availabilityQuery = `
          SELECT from_date, to_date
          FROM [dbo].[availability]
          WHERE application_id = @person_id
      `;
      const availabilityResult = await executeQuery(availabilityQuery, [person_id], ["person_id"], false);

      // Combine all fetched data into userProfile
      userProfile.competencies = competenceResult.recordset || [];
      userProfile.availability = availabilityResult.recordset || [];

      res.status(200).json(userProfile);
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router
