const express = require("express");
const router = express.Router();
const dbPool = require("../config/db");

// @route  GET yelp/events
// @desc   Get all list of events sorted by date
// @access Public
router.get("/", (req, res) => {
  try {
    const getEventsQuery = `SELECT * FROM events`;
    dbPool.query(getEventsQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Database Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "No events to display" }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
