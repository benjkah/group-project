const express = require('express');
const cors = require('cors');
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
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Database connection failed!", error);
  });

// Use Helmet to configure CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"],
    },
  })
);

// Use Express built-in body parsers (no need for body-parser package)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use('/access', accessRouter);
app.use('/app', appRouter);

// Use a correct PORT value
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
