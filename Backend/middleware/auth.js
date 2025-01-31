/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //  Get the requested web token from user
  const token = req.header('x-auth-token');

  //  If no token, deny access
  if (!token) {
    res.status(401).json({ msg: 'No token. Authorization denied.' });
  }

  //  Decode the web token and verify
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
