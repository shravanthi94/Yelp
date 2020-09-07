//Get express module
const express = require("express");
//Get body-parser module
const bodyParser = require("body-parser");
//Get express-session
const session = require("express-session");
//Get cookie-parser
const cookieParser = require("cookie-parser");

//Generate app for using express
const app = express();
//Use json output format - middleware
app.use(bodyParser.json());
//Use cookie parser
app.use(cookieParser());

//set up express session
app.use(
  session({
    secret: "CMPE273_yelp",
    resave: false,
    saveUninitialized: false
  })
);

module.exports = app;
