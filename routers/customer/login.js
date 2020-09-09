const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const dbPool = require("../../config/db");

// @route  POST yelp/customer/login
// @desc   Customer LOGIN route
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required.").notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //1. Fetch the customer details
      const fetchCustomerQuery = `SELECT customer_id, customer_password FROM customer WHERE customer_email_id='${email}'`;
      dbPool.query(fetchCustomerQuery, async (error, result) => {
        if (error) {
          return res.status(500).send("Server Error");
        }

        //2. Handle for invalid credentials
        if (result.length == 0) {
          return res
            .status(201)
            .send({ errors: [{ msg: "Invalid Credentails." }] });
        }

        //3. Decrypt the password
        const isMatch = await bcrypt.compare(
          password,
          result[0].customer_password
        );

        if (!isMatch) {
          return res
            .status(201)
            .send({ errors: [{ msg: "Invalid Credentials." }] });
        }

        //Send the web token
        const payload = {
          user: {
            id: email,
            usertype: "customer"
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 6000000 },
          (error, token) => {
            if (error) throw error;
            res.json({ token, id: result[0].customer_id });
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
