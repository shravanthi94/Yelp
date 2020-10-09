/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const dbPool = require('../../config/db');

// @route  POST yelp/restaurant/login
// @desc   restaurant LOGIN route
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //  1. Fetch the restaurant details
      const fetchrestaurantQuery = `SELECT restaurant_id, restaurant_password FROM restaurant WHERE restaurant_email_id='${email}'`;
      dbPool.query(fetchrestaurantQuery, async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Server Error');
        }

        //  2. Handle for invalid credentials
        if (result.length === 0) {
          return res
            .status(400)
            .send({ errors: [{ msg: 'Invalid Credentails.' }] });
        }

        //  3. Decrypt the password
        const isMatch = await bcrypt.compare(
          password,
          result[0].restaurant_password,
        );

        if (!isMatch) {
          return res
            .status(400)
            .send({ errors: [{ msg: 'Invalid Credentials.' }] });
        }

        //  Send the web token
        const payload = {
          user: {
            id: result[0].restaurant_id,
            usertype: 'restaurant',
          },
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 6000000 },
          (error, token) => {
            if (error) throw error;
            res.json({ token, id: result[0].restaurant_id });
          },
        );
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
