const express = require('express');
const router = express.Router();
const { executeQuery } = require("../database.js");

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

  router.get("/profile", async (req, res) => {
    const query = `
        SELECT person_id, name, surname, email
        FROM [dbo].[person]
        WHERE person_id = 1  -- Change this based on authentication
    `;

    try {
        const result = await executeQuery(query, [], [], false);
        
        if (result.recordset.length > 0) {
            const userProfile = result.recordset[0];

            // TO GET competencies
            const competenceQuery = `
                SELECT cp.competence_id, c.name, cp.years_of_experience
                FROM [dbo].[competence_profile] cp
                JOIN [dbo].[competence_translation] c ON cp.competence_id = c.competence_id
                WHERE cp.application_id = 1  -- Change based on logged-in user
            `;
            const competenceResult = await executeQuery(competenceQuery, [], [], false);

            // TO GET availability
            const availabilityQuery = `
                SELECT from_date, to_date
                FROM [dbo].[availability]
                WHERE application_id = 1  -- Change based on logged-in user
            `;
            const availabilityResult = await executeQuery(availabilityQuery, [], [], false);

            userProfile.competencies = competenceResult.recordset || [];
            userProfile.availability = availabilityResult.recordset || [];

            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: "Profile not found." });
        }

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});





//added Login 
  router.post("/login", async (req, res) => {
    const query = "SELECT * FROM [dbo].[person] WHERE username = @username AND password = @password";
    const values = [req.body.username, req.body.password];
    const paramNames = ["username", "password"];
    const isStoredProcedure = false;

    try {
        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        res.send(result.recordset.length > 0 ? result.recordset[0] : { message: "Invalid username or password." });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


  
  // module.exports = { router };


module.exports = router
