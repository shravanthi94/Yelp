/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const dbPool = require('../../config/db');

// @route  GET yelp/search/restaurants
// @desc   Get restaurants using item name,cuisine,location,mode of delivery
// @access Public
router.get('/restaurants/:data', (req, res) => {
  const searchData = req.params.data;
  console.log(searchData);
  try {
    const query = `SELECT r.restaurant_id
    FROM restaurant r
    LEFT OUTER JOIN menu_items m
    ON r.restaurant_id = m.restaurant_id
    WHERE (m.item_name LIKE '%${searchData}%' OR r.cuisine LIKE '%${searchData}%' OR 
    r.delivery_method LIKE '${searchData}' OR r.restaurant_location LIKE '%${searchData}%' )`;

    dbPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No restaurants found' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/search/restaurants/display/all
// @desc   Get restaurants using item name,cuisine,location,mode of delivery
// @access Public
router.get('/display/all', (req, res) => {
  const { restaurants } = req.body;
  try {
    const final = restaurants.join(', ');
    console.log('backend', final);

    const query = `SELECT * FROM restaurant WHERE restaurant_id IN (${final})`;

    dbPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No restaurants found' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
