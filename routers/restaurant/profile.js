const express = require("express");
const router = express.Router();
const dbPool = require("../../config/db");
const auth = require("../../middleware/auth");

// @route  GET yelp/restaurant/profile/all
// @desc   Get all restaurant profile details
// @access Public
router.get("/all", (req, res) => {
  try {
    const allResQuery = `SELECT * FROM restaurant`;
    dbPool.query(allResQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  GET yelp/restaurant/profile
// @desc   Get current restaurant profile details
// @access Private
router.get("/", auth, (req, res) => {
  const res_id = req.user.id;
  try {
    const getResQuery = `SELECT * FROM restaurant WHERE restaurant_id = '${res_id}'`;
    dbPool.query(getResQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "Restaurant not found" }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
