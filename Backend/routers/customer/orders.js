/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const dbPool = require('../../config/db');

// @route  GET yelp/customer/orders/all
// @desc   Get all customer orders placed
// @access Private
router.get('/all', auth, (req, res) => {
  const customerId = req.user.id;
  try {
    const allOrdersQuery = `SELECT * FROM orders WHERE customer_id=${customerId} ORDER BY order_date ASC`;
    dbPool.query(allOrdersQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'No orders placed' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  POST yelp/orders/customer/placeorder
// @desc   Place an order by current customer
// @access Private
router.post(
  '/placeorder',
  [
    auth,
    [
      check('restaurant_id', 'Restaurant ID is required').notEmpty(),
      check('delivery_option', 'Select the delivery option').notEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customerId = req.user.id;
    const restaurantId = req.body.restaurant_id;
    const deliveryOpt = req.body.delivery_option;

    try {
      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }
      today = `${yyyy}-${mm}-${dd}`;

      dbPool.query(
        `SELECT customer_name FROM customer WHERE customer_id=${customerId}`,
        (error, result) => {
          if (!error) {
            const customerName = result[0].customer_name;
            dbPool.query(
              `SELECT restaurant_name FROM restaurant WHERE restaurant_id=${restaurantId}`,
              (error1, result2) => {
                if (!error1) {
                  const resName = result2[0].restaurant_name;

                  const createOrderQuery = `INSERT into orders (restaurant_id, restaurant_name, customer_id, customer_name, order_date, delivery_option)
                  VALUES (${restaurantId}, '${resName}', ${customerId}, '${customerName}','${today}','${deliveryOpt}')`;

                  dbPool.query(createOrderQuery, (error2, result) => {
                    if (error2) {
                      console.log(error2);
                      return res.status(500).send('Database Error');
                    }
                    res.status(200).send('Order has been placed');
                  });
                }
              },
            );
          }
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  Get yelp/customer/orders/status/1
// @desc   restaurant update to the status route
// @access Private
router.get('/status/:order_status', auth, (req, res) => {
  const status = req.params.order_status.toUpperCase();
  console.log(status);
  const customerId = req.user.id;
  try {
    const query = `SELECT * FROM orders WHERE customer_id=${customerId} AND order_status='${status}'`;
    dbPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'No orders' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
