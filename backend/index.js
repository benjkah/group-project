const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connect } = require("./database.js");

//const router = require('./routes/router');
const userRouter = require("./routes/user.js");
const accessRouter = require('./routes/access.js')
const createRouter = require('./routes/create.js')

const app = express();

connect()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",  
  credentials: true,
  methods: ['GET', 'POST', 'PUT'],
  optionSuccessStatus: 200
};
app.use(cookieParser()); //use cookies
app.use(cors(corsOptions));
//app.use('/', router);
app.use("/user", userRouter);
app.use('/access', accessRouter);
app.use('/create', createRouter);



const port = process.env.DB_LOCAL_PORT;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
