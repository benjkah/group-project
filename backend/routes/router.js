const express = require('express');
const router = express.Router();
const { executeQuery } = require("../database.js");

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

  const users = [{name: "a"},{name: "b"}];

router.post("/oj", (req, res) => {

  const isValid = true
  if(isValid) {
      users.push({name: req.body.name})
      res.redirect(`/user/1`)
  } else {
    console.error("Error")
    // res.render("user/new", {name: req.body.name})
    res.send({name: req.body.name});
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
/*
  function loadUser(req, res, next) {
    // You would fetch your user from the db
    var user = { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' };
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('Failed to load user ' + req.params.id));
    }
  }

  router.get('/user/:id', loadUser, function(req, res){
    res.send('Viewing user ' + req.user.name);
  });
*/


module.exports = router
