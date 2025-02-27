const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const { connect } = require("./database.js");

const userRouter = require("./routes/user.js");
const accessRouter = require('./routes/access.js')
const appRouter = require('./routes/app.js')

const app = express();

connect()
  .then(() => {
    // console.log("Connected to the database.");
  })
  .catch((error) => {
    // console.log("Database connection failed!");
    // console.log(error);
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
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",     // we can add mutiple domain as ["http://localhost:3000", "https://benjamin.com"]  for more secure and JWT Cookies 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionSuccessStatus: 200
};
app.use(cookieParser()); //use cookies
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use('/access', accessRouter);
app.use('/app', appRouter);



const port = process.env.DB_LOCAL_PORT;
app.listen(port, () => {
  // console.log(`Server is running at port: ${port}`);
});