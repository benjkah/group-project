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

/*
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

  
  // module.exports = { router };

*/

/**
 * 1) LOGIN ROUTE
 *    Expects {username, password} in req.body
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  
    const query = `
      SELECT person_id, name, surname, pnr, email, role_id, username
      FROM [dbo].[person]
      WHERE username = @username AND password = @password
    `;
    
    try {
      // Setting isStoredProcedure = false so we run a raw query
      const result = await executeQuery(
        query,
        [username, password],
        ["username", "password"],
        false
      );
  
      // If a matching user is found
      if (result.recordset && result.recordset.length > 0) {
        return res.json(result.recordset[0]);
      } else {
        // If no user found, invalid credentials
        return res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  });
  
  /**
   * 2) REGISTER ROUTE
   *    Expects:
   *      {
   *        name, surname, pnr, email,
   *        username, password, [optional] role_id
   *      }
   */
  router.post("/register", async (req, res) => {
    const { name, surname, pnr, email, username, password, role_id = 2 } = req.body;
  
    // Basic field validation
    if (!name || !surname || !pnr || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const query = `
      INSERT INTO [dbo].[person] (name, surname, pnr, email, username, password, role_id)
      OUTPUT inserted.person_id, inserted.name, inserted.surname, inserted.pnr,
             inserted.email, inserted.username, inserted.role_id
      VALUES (@name, @surname, @pnr, @email, @username, @password, @role_id)
    `;
    
    try {
      const result = await executeQuery(
        query,
        [name, surname, pnr, email, username, password, role_id],
        ["name", "surname", "pnr", "email", "username", "password", "role_id"],
        false
      );
  
      if (result.recordset && result.recordset.length > 0) {
        return res.json(result.recordset[0]);
      } else {
        return res.status(400).json({ message: "Registration failed." });
      }
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router