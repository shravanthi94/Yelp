/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const dbPool = require('../../config/db');
const auth = require('../../middleware/auth');

// @route  Get yelp/restaurant/orders
// @desc   restaurant get all orders route
// @access Private
router.get('/', auth, (req, res) => {
  const resId = req.user.id;
  try {
    const allorderQuery = `SELECT * FROM orders WHERE restaurant_id = ${resId}`;
    dbPool.query(allorderQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'No orders to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/restaurant/orders/new
// @desc   restaurant new orders route
// @access Private
router.get('/new', auth, (req, res) => {
  const resId = req.user.id;
  try {
    const neworderQuery = `SELECT * FROM orders WHERE restaurant_id = ${resId} AND order_type='NEW'`;
    dbPool.query(neworderQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'No orders to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/restaurant/orders/delivered
// @desc   restaurant delivered orders route
// @access Private
router.get('/delivered', auth, (req, res) => {
  const resId = req.user.id;
  try {
    const delorderQuery = `SELECT * FROM orders WHERE restaurant_id = ${resId} AND order_type='DELIVERED'`;
    dbPool.query(delorderQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'No orders to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/restaurant/orders/cancelled
// @desc   restaurant cancelled orders route
// @access Private
router.get('/cancelled', auth, (req, res) => {
  const resId = req.user.id;
  try {
    const canorderQuery = `SELECT * FROM orders WHERE restaurant_id = ${resId} AND order_type='CANCELLED'`;
    dbPool.query(canorderQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'No orders to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
