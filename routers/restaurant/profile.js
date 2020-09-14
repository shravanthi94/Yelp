const express = require("express");
const router = express.Router();
const dbPool = require("../../config/db");

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

module.exports = router;
