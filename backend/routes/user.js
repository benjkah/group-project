const express = require('express');
const router = express.Router();
const { executeQuery } = require("../database.js");

router.get("/all", async (req, res) => {
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
})

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Get user white ID ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`put user white ID ${req.params.id}`);
    })

router.param("id", (req, res, next, id) => {
    console.log(id);
    next();
    
})

module.exports = router
