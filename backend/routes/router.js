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
