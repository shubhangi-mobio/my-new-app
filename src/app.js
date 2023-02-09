require("dotenv").config();

const cors = require("cors"); //configure the web API's security
const morgan = require("morgan"); //for log HTTP requests and errors
const logger = require("morgan");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");


const app = express();

global.__basedir = __dirname;   

//database connection

require("../config/db");

// MIDDLEWARE
app.use(logger("dev"));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({                 // to support URL-encoded bodies
  limit: '100mb',
  extended: true
}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// app.use(indexRouter);
// require('./routes/routeIndex')(app)


// v1 api routes

app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the project 🙌" });
});

module.exports = app;
