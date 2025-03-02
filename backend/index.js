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
      connectSrc: ["'self'", "https://recruitment-backend-g8-ehcncmbphdc6a6ad.swedencentral-01.azurewebsites.net", "https://red-coast-0ef75bd03.6.azurestaticapps.net", "http://localhost:4000"],

    },
  })
);

// Use Express built-in body parsers (no need for body-parser package)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://red-coast-0ef75bd03.6.azurestaticapps.net",  //  Frontend in production
  "http://localhost:3000"  // Local frontend (for testing)
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
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
