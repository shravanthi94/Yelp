/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const dbPool = require('../config/db');

// @route  POST yelp/customer/reviews/insert/:res_id
// @desc   Add review to a restaurant
// @access Private
router.post('/insert/:res_id', auth, (req, res) => {
  const customerId = req.user.id;
  const restaurantId = req.params.res_id;
  const { rating, review } = req.body;
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
      `SELECT customer_name FROM customer WHERE customer_id = ${customerId}`,
      (error, result) => {
        if (!error) {
          const customerName = result[0].customer_name;
          const addReviewQuery = `INSERT into reviews (rest_id, cust_id, date, comment, rating, cust_name) 
          VALUES (${restaurantId}, ${customerId}, '${today}' ,'${review}','${rating}', '${customerName}')`;

          dbPool.query(addReviewQuery, (error2) => {
            if (error2) {
              console.log(error2);
              return res.status(500).send('Database Error');
            }

            res.status(200).send('Review added');
          });
        }
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  PUT yelp/customer/reviews/update/:res_id
// @desc   Update review to a restaurant
// @access Private
router.put('/update/:res_id', auth, (req, res) => {
  const customerId = req.user.id;
  const restaurantId = req.params.res_id;
  const { rating, review } = req.body;
  try {
    const updateReviewQuery = `UPDATE reviews set comment = ${review}, rating = ${rating} 
    WHERE rest_id = ${restaurantId} AND cust_id = ${customerId}`;

    dbPool.query(updateReviewQuery, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Database Error');
      }

      res.status(200).send('Review updated');
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/reviews/restaurant
// @desc   Get all reviews for a restaurant
// @access Private
router.get('/restaurant', auth, (req, res) => {
  const restId = req.user.id;
  try {
    const getRestReviewsQuery = `SELECT * FROM reviews WHERE rest_id=${restId}`;
    dbPool.query(getRestReviewsQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No reviews to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
