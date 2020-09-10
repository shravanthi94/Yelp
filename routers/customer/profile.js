const express = require("express");
const router = express.Router();
const dbPool = require("../../config/db");
const auth = require("../../middleware/auth");

// @route  GET yelp/customer/profile/all
// @desc   Get all customer profiles
// @access Public
router.get("/all", (req, res) => {
  try {
    const allCustomersQuery = `SELECT * FROM customer`;
    dbPool.query(allCustomersQuery, (error, result) => {
      if (error) {
        return res.status(500).send("Server Error");
      }
      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  GET yelp/customer/profile
// @desc   Get current customer profiles
// @access Private
router.get("/", auth, (req, res) => {
  const customer_id = req.user.id;
  try {
    const allCustomersQuery = `SELECT * FROM customer WHERE customer_id = '${customer_id}'`;
    dbPool.query(allCustomersQuery, (error, result) => {
      if (error) {
        return res.status(500).send("Server Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "Customer not found" }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  GET yelp/customer/profile/customer_id
// @desc   Get customer profiles using customer id
// @access Public
router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    const findCustomerQuery = `SELECT * FROM customer WHERE customer_id = '${customer_id}'`;

    dbPool.query(findCustomerQuery, (error, result) => {
      if (error) {
        return res.status(500).send("Server Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "Customer not found" }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
