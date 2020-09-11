const express = require("express");
const router = express.Router();
const dbPool = require("../../config/db");
const auth = require("../../middleware/auth");

// @route  GET yelp/customer/profile/all
// @desc   Get all customer profile details
// @access Public
router.get("/all", (req, res) => {
  try {
    const allCustomersQuery = `SELECT * FROM customer`;
    dbPool.query(allCustomersQuery, (error, result) => {
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

// @route  GET yelp/customer/profile
// @desc   Get current customer profile details
// @access Private
router.get("/", auth, (req, res) => {
  const customer_id = req.user.id;
  try {
    const allCustomersQuery = `SELECT * FROM customer WHERE customer_id = '${customer_id}'`;
    dbPool.query(allCustomersQuery, (error, result) => {
      if (error) {
        console.log(error);
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
// @desc   Get customer profile details using customer id
// @access Public
router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    const findCustomerQuery = `SELECT * FROM customer WHERE customer_id = '${customer_id}'`;

    dbPool.query(findCustomerQuery, (error, result) => {
      if (error) {
        console.log(error);
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

// @route  Update yelp/customer/profile/basic
// @desc   Update current user basic details
// @access Private
router.post("/basic", auth, (req, res) => {
  const customer_id = req.user.id;
  const {
    name,
    date_of_birth,
    city,
    state,
    country,
    nick_name,
    headline
  } = req.body;

  try {
    const updateCustomerQuery = `UPDATE customer set customer_name = '${name}', date_of_birth = '${date_of_birth}', 
    city = '${city}', state = '${state}', country = '${country}', nick_name = '${nick_name}', headline = '${headline}' 
    WHERE customer_id = ${customer_id}`;

    dbPool.query(updateCustomerQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }

      return res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  GET yelp/customer/profile/about/customer_id
// @desc   Get customer profile details using customer id
// @access Public
router.get("/about/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    const findCustomerQuery = `SELECT * FROM customer_about_data WHERE customer_id = '${customer_id}'`;

    dbPool.query(findCustomerQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "Customer about details not added." }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  POST yelp/customer/profile/about
// @desc   Add current customer about me details
// @access Private
router.post("/about", auth, (req, res) => {
  const customer_id = req.user.id;
  const {
    yelping_since,
    things_i_love,
    find_me_in,
    my_blog,
    when_not_yelping,
    why_read_my_reviews,
    recent_discovery
  } = req.body;

  try {
    const addAboutQuery = `INSERT into customer_about_data (yelping_since, things_i_love, find_me_in, my_blog, when_not_yelping,why_read_my_reviews,recent_discovery, customer_id)
    VALUES ('${yelping_since}', '${things_i_love}', '${find_me_in}', '${my_blog}', '${when_not_yelping}', '${why_read_my_reviews}', '${recent_discovery}', ${customer_id})`;

    dbPool.query(addAboutQuery, (error, result) => {
      if (error) {
        console.log(error.sqlMessage);
        return res.status(500).send("Server Error");
      }
      res.send("About me details added.");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error.");
  }
});

// @route  PUT yelp/customer/profile/about
// @desc   Update current customer about me details
// @access Private
router.put("/about", auth, (req, res) => {
  const customer_id = req.user.id;
  const {
    yelping_since,
    things_i_love,
    find_me_in,
    my_blog,
    when_not_yelping,
    why_read_my_reviews,
    recent_discovery
  } = req.body;

  try {
    const updateAboutQuery = `UPDATE customer_about_data set yelping_since='${yelping_since}', things_i_love='${things_i_love}', 
    find_me_in='${find_me_in}', my_blog='${my_blog}', when_not_yelping='${when_not_yelping}', 
    why_read_my_reviews='${why_read_my_reviews}', recent_discovery='${recent_discovery}' WHERE (customer_id=${customer_id})`;

    dbPool.query(updateAboutQuery, (error, result) => {
      if (error) {
        console.log(error.sqlMessage);
        return res.status(500).send("Server Error");
      }
      res.send("About me details updated.");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
