//  Get express module
const express = require('express');
//  Get body-parser module
const bodyParser = require('body-parser');
//  Get express-session
const session = require('express-session');
//  Get cookie-parser
const cookieParser = require('cookie-parser');
//  Get cors
const cors = require('cors/lib');

//  Generate app for using express
const app = express();
//  Use json output format - middleware
app.use(bodyParser.json());
//  Use cookie parser
app.use(cookieParser());
//  Allow cross origin resourse sharing
app.use(
  cors({
    origin: 'http://54.183.239.208:3000',
    credentials: true,
  }),
);

app.use((request, response, next) => {
  response.setHeader(
    'Access-Control-Allow-Origin',
    'http://54.183.239.208:3000',
  );
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  response.setHeader('Cache-Control', 'no-cache');
  next();
});

//  Set up express session
app.use(
  session({
    secret: 'CMPE273_yelp',
    resave: false,
    saveUninitialized: false,
  }),
);

module.exports = app;
