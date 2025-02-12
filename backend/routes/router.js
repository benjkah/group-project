const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const { executeQuery } = require("../database.js");
const { authenticateUser } = require("../middleware/authMiddleware");

// const { createDatabaseConnection, connect } = require("./../database.js")
// const db = createDatabaseConnection()
/*
router.get('/users', (req, res) => {
    const userData = [
        {
            "id": 1, 
            "name": "Anders"
        },
        {
            "id": 2,
            "name": "Johan"
        },
        {
            "id": 3,
            "name": "Kalle"
        }
    ]

    res.send(userData)
});


router.post('/test', async (req, res) => {

    const {id, namn} = req.body;

    res.send({id});

    try {
        
        const person = req.body;
        // const rowsAffected = await db.createPesron(person);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
    res.send('ok')
  });


router.post('/createPesron', async (req, res) => {
    try {
        const person = req.body;
        const rowsAffected = await db.createPesron(person);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
    res.send('ok')
  });

  router.get('/getUser', async (req, res) => {
    console.log("ok");
    try {
        const persons = await db.getUser;
        console.log("OK 2")
        res.status(200).json(persons);
    } catch (err) {
        res.status(500).json({ error: err?.message })
    }
});


router.get('/user', (req, res) => {
    const { id, name } = req.body
    const userData = [
        {
            "person_id": 1, 
            "name": "Anders",
            "surname": "kalle",
            "pnr": 22292929,
            "email": "anders@mmail.com",
            "role_id": 1,
            "username": "anders"
        }
    ]

    res.send([userData, id])
});

router.get('/login', (req, res) => {
    const userData = [
        {
            "person_id": 1, 
            "name": "Anders",
            "surname": "kalle",
            "pnr": 22292929,
            "email": "anders@mmail.com",
            "role_id": 1,
            "username": "anders"
        }
    ]

    if(userData.email == req.body.email) {
        res.send(true)
    } else {
        res.send(false)
    }
});

*/


router.get("/users", async (req, res) => {
    const query = "SELECT TOP (10) * FROM [dbo].[person]";
    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  router.post("/kalle", async (req, res) => {
    const query = "INSERT INTO [dbo].[role] ([name]) VALUES (kalle)";

    const values = [];
    const paramNames = [];
    const isStoredProcedure = false;
    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      res.send(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

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





router.post("/login", async (req, res) => {
    const query = "SELECT * FROM [dbo].[person] WHERE username = @username AND password = @password";
    const values = [req.body.username, req.body.password];
    const paramNames = ["username", "password"];

    try {
        const result = await executeQuery(query, values, paramNames, false);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Generate JWT token
            const token = jwt.sign(
                { person_id: user.person_id }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );

            res.json({ ...user, token }); // ✅ Return user data + token
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


  
  // module.exports = { router };


module.exports = router