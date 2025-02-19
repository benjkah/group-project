  const express = require('express');
  const router = express.Router();
  const { executeQuery } = require("../database.js");



  /**
   * 1) LOGIN ROUTE
   *    Expects {username, password} in req.body
   */
  router.post("/login", async (req, res) => {
      console.log("post login: ")
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
        const result = await executeQuery(
          query,
          [username, password],
          ["username", "password"],
          false
        );

        console.log("login post: ", result);
    
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
    
      try {
        // Check if username, email, or pnr already exist
        const checkQuery = `
          SELECT person_id, username, email, pnr
          FROM [dbo].[person]
          WHERE username = @username OR email = @email OR pnr = @pnr
        `;
        const checkResult = await executeQuery(
          checkQuery,
          [username, email, pnr],
          ["username", "email", "pnr"],
          false
        );

        console.log("after sql check: ", checkResult)
        
        if (checkResult.recordset && checkResult.recordset.length > 0) {
          const existing = checkResult.recordset[0];
          
          if (existing.username === username) {
            return res.status(400).json({ message: "Username already taken." });
          }
          if (existing.email === email) {
            return res.status(400).json({ message: "Email already registered." });
          }
          if (existing.pnr === pnr) {
            return res.status(400).json({ message: "PNR already exists." });
          }
          // Fallback error message
          return res.status(400).json({ message: "User already exists." });
        }
    
        // Proceed with the INSERT if no duplicate is found
        const query = `
          INSERT INTO [dbo].[person] (name, surname, pnr, email, username, password, role_id)
          OUTPUT inserted.person_id, inserted.name, inserted.surname, inserted.pnr,
                 inserted.email, inserted.username, inserted.role_id
          VALUES (@name, @surname, @pnr, @email, @username, @password, @role_id)
        `;
    
        const result = await executeQuery(
          query,
          [name, surname, pnr, email, username, password, role_id],
          ["name", "surname", "pnr", "email", "username", "password", "role_id"],
          false
        );
    
        console.log("Insert result router.js: ", result);
    
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