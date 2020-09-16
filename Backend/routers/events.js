const express = require("express");
const router = express.Router();
const dbPool = require("../config/db");
const { check, validationResult } = require("express-validator");

// @route  GET yelp/events
// @desc   Get all list of events sorted by date
// @access Public
router.get("/", (req, res) => {
  try {
    const getEventsQuery = `SELECT * FROM events ORDER BY event_date ASC`;
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

// @route  POST yelp/events
// @desc   Create an event
// @access Public
router.post(
  "/",
  [
    check("event_name", "Event name is required").notEmpty(),
    check("event_time", "Event time is required").notEmpty(),
    check("event_date", "Event date is required").notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      event_name,
      event_description,
      event_time,
      event_date,
      event_location,
      event_hashtags
    } = req.body;

    try {
      const createEventQuery = `INSERT into events 
      (event_name, event_description, event_time, event_date, event_location, event_hashtags)
      VALUES ('${event_name}','${event_description}','${event_time}','${event_date}','${event_location}','${event_hashtags}')`;

      dbPool.query(createEventQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Database Error");
        }
        res.status(200).send("Added event details");
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
