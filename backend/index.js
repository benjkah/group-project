const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const { connect } = require("./database.js");

const userRouter = require("./routes/user.js");
const accessRouter = require('./routes/access.js');
const appRouter = require('./routes/app.js');

const app = express();

/**
 * Establishes a connection to the database.
 * Logs a message uccess or failure.
 */
connect()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Database connection failed!", error);
  });

/**
 * Configures security settings using Helmet.
 * 
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "https://recruitment-backend-g8-ehcncmbphdc6a6ad.swedencentral-01.azurewebsites.net",
        "https://red-coast-0ef75bd03.6.azurestaticapps.net",
        "http://localhost:4000"
      ],
    },
  })
);

/**
 * Middleware to parse JSON and URL-encoded request bodies.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Allowed origins for CORS (Cross-Origin Resource Sharing).
 * - use  frontend: `https://red-coast-0ef75bd03.6.azurestaticapps.net`
 * - use Local frontend: `http://localhost:3000`
 */
const allowedOrigins = [
  "https://red-coast-0ef75bd03.6.azurestaticapps.net",
  "http://localhost:3000"
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

/**
 * Middleware for handling cookies and CORS settings.
 */
app.use(cookieParser());
app.use(cors(corsOptions));

/**
 * Default route to verify that the backend is running.
 * @route GET /
 * @returns {string} A message for confirming the server is active.
 */
app.get("/", (req, res) => {
  res.send(" 🔥 Azure Backend is running! so u dont need start it local 🔥");
});

/**
 * Mounts user roues in `/user`.
 */
app.use("/user", userRouter);

/**
 * Mounts access routes in `/access`.
 */
app.use('/access', accessRouter);

/**
 * Mounts application  routes in ` `/app`.
 */
app.use('/app', appRouter);

/**
 *
 * Uses the PORT environment variable or defaults to 4000.
 */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});