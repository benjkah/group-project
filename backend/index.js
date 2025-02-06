const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const { createDatabaseConnection, connect } = require("./database.js")

const router = require('./routes/router')

const app = express()


/*
connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });
*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials:true, 
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use('/', router)

const port = process.env.DB_LOCAL_PORT
const server = app.listen(port, () =>{
    console.log(`Server is running at port: ${port}`)
})
