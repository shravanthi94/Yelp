/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const dbPool = require('../config/db');

const customerstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/customers`,
  filename: (req, file, cb) => {
    cb(
      null,
      `customer${req.user.id}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const customeruploads = multer({
  storage: customerstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/customer
// @desc   Upload profile picture of the customer
// @access Private
router.post('/customer', auth, (req, res) => {
  customeruploads(req, res, (err) => {
    if (!err) {
      const imageQuery = `UPDATE customer SET
      customer_image = '${req.file.filename}' WHERE customer_id = ${req.user.id}`;
      try {
        dbPool.query(imageQuery, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).send('Database error');
          }
          res.status(200).json(result);
        });
      } catch (error1) {
        console.log(error1);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('Error!');
    }
  });
});

// @route  GET yelp/images/customer/:customer_image
// @desc   View the customer profile picture
// @access Public
router.get('/customer/:customer_image', (req, res) => {
  const image = `${path.join(__dirname, '..')}/public/uploads/customers/${
    req.params.customer_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '..',
      )}/public/uploads/customers/placeholderimg.jpg`,
    );
  }
});

const resstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/restaurants`,
  filename: (req, file, cb) => {
    cb(
      null,
      `restaurant${req.user.id}-${Date.now()}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const resuploads = multer({
  storage: resstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/restaurant
// @desc   Upload profile picture of the restaurant
// @access Private
router.post('/restaurant', auth, (req, res) => {
  resuploads(req, res, (err) => {
    if (!err) {
      const imageQuery = `UPDATE restaurant SET
        restaurant_image = '${req.file.filename}' WHERE restaurant_id = ${req.user.id}`;
      try {
        dbPool.query(imageQuery, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).send('Database error');
          }
          res.status(200).json(result);
        });
      } catch (error1) {
        console.log(error1);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('Error!');
    }
  });
});

// @route  GET yelp/images/restaurant/:restaurant_image
// @desc   View the restaurant profile picture
// @access Public
router.get('/restaurant/:restaurant_image', (req, res) => {
  const image = `${path.join(__dirname, '..')}/public/uploads/restaurants/${
    req.params.restaurant_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '..',
      )}/public/uploads/restaurants/placeholderimg.jpg`,
    );
  }
});

const dishstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/uploads/dishes`,
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}-dish${req.params.dish_id}-${Date.now()}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const dishuploads = multer({
  storage: dishstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/dish/:dish_id
// @desc   Upload pictures of the dish
// @access Private
router.post('/dish/:dish_id', auth, (req, res) => {
  dishuploads(req, res, (err) => {
    if (!err) {
      const imageQuery = `UPDATE menu_items SET
          item_image = CONCAT(item_image, ',${req.file.filename}') WHERE item_id=${req.params.dish_id}`;
      try {
        dbPool.query(imageQuery, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).send('Database error');
          }
          res.status(200).json(result);
        });
      } catch (error1) {
        console.log(error1);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('Error!');
    }
  });
});

// @route  GET yelp/images/dish/:dish_image
// @desc   View the restaurant profile picture
// @access Public
router.get('/dish/:dish_image', (req, res) => {
  const image = `${path.join(__dirname, '..')}/public/uploads/dishes/${
    req.params.dish_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(__dirname, '..')}/public/uploads/dishes/placeholderimg.png`,
    );
  }
});

// @route  GET yelp/images/restaurant/all/:res_id
// @desc   View the restaurant profile picture
// @access Public
router.get('/restaurant/all/:res_id', (req, res) => {
  const resId = req.params.res_id;
  try {
    const getResQuery = `SELECT item_image FROM menu_items WHERE restaurant_id = '${resId}'`;
    dbPool.query(getResQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server Error');
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
