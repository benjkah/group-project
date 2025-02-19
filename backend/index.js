const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const { connect } = require("./database.js");
const router = require('./routes/router');

const app = express();

connect()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

// Use Helmet to configure CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],  // Allow inline scripts during development
      styleSrc: ["'self'", "'unsafe-inline'"],  // Allow inline styles during development
      imgSrc: ["'self'", "data:"],  // Allow images from the same domain or base64
      connectSrc: ["'self'", "http://localhost:4000"],  // Allow API calls to your backend
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/', router);

const port = process.env.DB_LOCAL_PORT;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
})