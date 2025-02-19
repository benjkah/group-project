const express = require('express');
const router = express.Router();
const { executeQuery } = require("../database.js");

router.post("/user", async (req, res) => {
    console.log(req.body);
    const values = [req.body.name, req.body.surname, req.body.pnr, req.body.email, req.body.pasword, 1, req.body.usernamn];

    const paramNames = ["name", "surname", "pnr", "email", "pasword", "role_id" ,"usernamn"];

    try {
        const query = `
            INSERT INTO [dbo].[person]
            ([name]
            ,[surname]
            ,[pnr]
            ,[email]
            ,[password]
            ,[role_id]
            ,[username])
        VALUES (
            name,
            surname,
            pnr,
            email,
            password,
            role_id,
            username)
        `;
        const result = await executeQuery(query, values, paramNames, false);

        console.log(result);
  
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
  });

module.exports = router