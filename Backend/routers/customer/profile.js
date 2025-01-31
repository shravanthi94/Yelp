/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');
const dbPool = require('../../config/db');
const auth = require('../../middleware/auth');

// @route  GET yelp/customer/profile/all
// @desc   Get all customer profile details
// @access Public
router.get('/all', (req, res) => {
  try {
    const allCustomersQuery = 'SELECT * FROM customer';
    dbPool.query(allCustomersQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server Error');
      }
      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/customer/profile
// @desc   Get current customer profile details
// @access Private
router.get('/', auth, (req, res) => {
  const customerId = req.user.id;
  try {
    const allCustomersQuery = `SELECT * FROM customer WHERE customer_id = '${customerId}'`;
    dbPool.query(allCustomersQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/customer/profile/customer_id
// @desc   Get customer profile details using customer id
// @access Public
router.get('/display/:customer_id', async (req, res) => {
  const customerId = req.params.customer_id;

  try {
    const findCustomerQuery = `SELECT * FROM customer WHERE customer_id = '${customerId}'`;

    dbPool.query(findCustomerQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Update yelp/customer/profile/basic
// @desc   Update current user basic details
// @access Private
router.post(
  '/basic',
  [auth, [check('name', 'Customer name is required').notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customerId = req.user.id;
    const {
      name,
      dateOfBirth,
      city,
      state,
      country,
      nickName,
      headline,
    } = req.body;

    try {
      const updateCustomerQuery = `UPDATE customer set customer_name = '${name}', date_of_birth = '${dateOfBirth}', 
          city = '${city}', state = '${state}', country = '${country}', nick_name = '${nickName}', 
          headline = '${headline}' WHERE customer_id = ${customerId}`;

      dbPool.query(updateCustomerQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Database Error');
        }

        return res.status(200).json(result);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  GET yelp/customer/profile/about
// @desc   Get customer profile details using customer id
// @access Public
router.get('/about', auth, async (req, res) => {
  const customerId = req.user.id;

  try {
    const findCustomerQuery = `SELECT yelping_since, 
    things_i_love, find_me_in, my_blog, 
    when_not_yelping, why_read_my_reviews, 
    recent_discovery FROM customer WHERE customer_id = '${customerId}'`;

    dbPool.query(findCustomerQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer about details not added.' }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  POST yelp/customer/profile/about
// @desc   Update current customer about me details
// @access Private
router.post('/about', auth, (req, res) => {
  const customerId = req.user.id;
  const {
    thingsILove,
    findMeIn,
    myBlog,
    whenNotYelping,
    whyReadMyReviews,
    recentDiscovery,
  } = req.body;

  try {
    const updateAboutQuery = `UPDATE customer set 
    things_i_love='${thingsILove}', find_me_in='${findMeIn}', my_blog='${myBlog}', 
    when_not_yelping='${whenNotYelping}', why_read_my_reviews='${whyReadMyReviews}', 
    recent_discovery='${recentDiscovery}' WHERE (customer_id=${customerId})`;

    dbPool.query(updateAboutQuery, (error, result) => {
      if (error) {
        console.log(error.sqlMessage);
        return res.status(500).send('Server Error');
      }
      res.status(200).send('About me details updated.');
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error.');
  }
});

// @route  POST yelp/customer/profile/contact
// @desc   Update current customer contact information
// @access Private
router.post(
  '/contact',
  [auth, [check('email', 'Customer email is required.').notEmpty().isEmail()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customerId = req.user.id;
    const { email, phone } = req.body;

    try {
      const contactUpdateQuery = `UPDATE customer set customer_email_id='${email}', 
    customer_phone='${phone}' WHERE customer_id = ${customerId}`;

      dbPool.query(contactUpdateQuery, (error, result) => {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(500).send('Server Error');
        }
        res.status(200).send('Contact details updated.');
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
