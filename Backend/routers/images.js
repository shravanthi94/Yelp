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

module.exports = router;
