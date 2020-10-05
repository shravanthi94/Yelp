/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/order */
const express = require('express');

const router = express.Router();
const dbPool = require('../config/db');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route  GET yelp/events
// @desc   Get all list of events sorted by date
// @access Public
router.get('/', (req, res) => {
  try {
    const getEventsQuery = 'SELECT * FROM events ORDER BY event_date ASC';
    dbPool.query(getEventsQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No events to display' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET yelp/events/event_name
// @desc   Get events by event name
// @access Public
router.get('/:event_name', (req, res) => {
  const eventName = req.params.event_name;
  try {
    const getEventNameQuery = `SELECT * FROM events WHERE event_name = '${eventName}'`;
    dbPool.query(getEventNameQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No events with that name' }] });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  POST yelp/events
// @desc   Create an event
// @access Public
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Event name is required').notEmpty(),
      check('time', 'Event time is required').notEmpty(),
      check('date', 'Event date is required').notEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createrId = req.user.id;

    const { name, description, time, date, location, hashtags } = req.body;

    try {
      const createEventQuery = `INSERT into events 
      (event_name, event_description, event_time, event_date, event_location, event_hashtags, creater_id)
      VALUES ('${name}','${description}','${time}','${date}','${location}','${hashtags}', ${createrId})`;

      dbPool.query(createEventQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Database Error');
        }
        res.status(200).send('Added event details');
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route  POST yelp/events/register
// @desc   Register for an event
// @access Public
router.post('/register/:event_id', auth, (req, res) => {
  const eventId = req.params.event_id;
  const customerId = req.user.id;
  try {
    const checkEventQuery = `SELECT * FROM events WHERE event_id= '${eventId}'`;

    dbPool.query(checkEventQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No events with that id' }] });
      }
      const registerQuery = `INSERT into event_register (event_id, customer_id)
        VALUES ('${eventId}','${customerId}')`;

      dbPool.query(registerQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Database Error');
        }
        res.status(200).send('Registered for the event');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/events/created/all
// @desc   Display all events created by current customer
// @access Public
router.get('/created/all', auth, (req, res) => {
  const createrId = req.user.id;
  try {
    const customersQuery = `SELECT * FROM events  WHERE creater_id = ${createrId}`;

    dbPool.query(customersQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res.status(400).json({
          errors: [{ msg: 'No events created by you.' }],
        });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/events/customers/:event_id
// @desc   Display all customers registered for an event
// @access Public
router.get('/customers/list/:event_id', (req, res) => {
  const eventId = req.params.event_id;
  try {
    const customersQuery = `SELECT customer.* FROM event_register LEFT JOIN customer
    ON customer.customer_id = event_register.customer_id WHERE event_register.event_id = ${eventId}`;

    dbPool.query(customersQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res.status(400).json({
          errors: [{ msg: 'No customers registered for the event.' }],
        });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  Get yelp/events/myevent/me
// @desc   Display all events registered by a customer
// @access Public
router.get('/myevent/me', auth, (req, res) => {
  const customerId = req.user.id;
  try {
    const eventsQuery = `SELECT events.* FROM event_register LEFT JOIN events
      ON events.event_id = event_register.event_id WHERE event_register.customer_id = ${customerId}`;

    dbPool.query(eventsQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database Error');
      }
      if (result.length === 0) {
        return res.status(400).json({
          errors: [{ msg: 'No events registered.' }],
        });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
