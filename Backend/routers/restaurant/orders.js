/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
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
          .status(400)
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
          .status(400)
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
    const delorderQuery = `SELECT * FROM orders WHERE restaurant_id = ${resId} AND order_type='COMPLETED'`;
    dbPool.query(delorderQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
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
          .status(400)
          .json({ errors: [{ msg: 'No orders to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Update yelp/restaurant/orders/status/1
// @desc   restaurant update to the status route
// @access Private
router.post(
  '/status/:order_id',
  [auth, [check('status', 'Order status is required').notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const orderId = req.params.order_id;
    const { status } = req.body;
    try {
      let orderType = '';
      if (status === 'PICKED UP' || status === 'DELIVERED') {
        orderType = 'COMPLETED';
      }
      const updateQuery = `UPDATE orders SET order_status= '${status}', 
                        order_type='${orderType}' WHERE order_id=${orderId}`;
      dbPool.query(updateQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Database Error');
        }
        res.status(200).send('Status updated');
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Get yelp/restaurant/orders/cancelorder
// @desc   restaurant update to recieved route
// @access Private
router.post('/cancelorder/:order_id', auth, (req, res) => {
  const orderId = req.params.order_id;
  try {
    const cancelQuery = `UPDATE orders SET order_status= 'CANCELLED', 
                          order_type='CANCELLED' WHERE order_id = ${orderId}`;
    dbPool.query(cancelQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      res.status(200).send('Order Cancelled');
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
