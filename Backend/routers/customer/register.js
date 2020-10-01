/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

const dbPool = require('../../config/db');

const router = express.Router();

// @route  POST yelp/customer/register
// @desc   Customer SIGNUP route
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password must be 8 characters long.').isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //  1. Query to check if customer exists
      const checkCustomerQuery = `SELECT customer_email_id FROM customer WHERE customer_email_id = '${email}'`;

      dbPool.query(checkCustomerQuery, async (error, result) => {
        if (error) {
          return res.status(500).send('Server Error');
        }

        if (result.length > 0) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'Customer already exists.' }] });
        }

        //  2. If customer does not exist, hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //  3. Add gravatar to customer
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });

        //  4. save to database
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const date = new Date();
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const yelpingSince = `${month}, ${year}`;
        const insertDataQuery = `INSERT into customer (customer_name, customer_email_id, customer_password, customer_image, yelping_since )
            VALUES ('${name}', '${email}', '${hashedPassword}', '${avatar}', '${yelpingSince}')`;

        dbPool.query(insertDataQuery, (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
          }
          //  Pass the jsonwebtoken for that customer
          const payload = {
            user: {
              id: result.insertId,
              usertype: 'customer',
            },
          };

          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 6000000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token, id: result.insertId });
            },
          );
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
