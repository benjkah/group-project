const express = require('express');
const router = express.Router();

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

router.post("/logout", async (req, res) => {
    req.send("logout")
});

module.exports = router