const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dbPool = require("../../config/db");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route  POST yelp/restaurant/register
// @desc   Restaurant SIGNUP route
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required.").notEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password must be 8 characters long.").isLength({
      min: 8
    }),
    check("location", "Location is required.").notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      //1. Query to check if restaurant already exists
      const checkResQuery = `SELECT restaurant_email_id FROM restaurant WHERE restaurant_email_id = '${email}'`;

      dbPool.query(checkResQuery, async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Server Error");
        }

        if (result.length > 0) {
          return res
            .status(201)
            .json({ errors: [{ msg: "Restaurant already exists." }] });
        }

        //2. If restaurant does not exist, hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //3. Add gravatar to restaurant
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        //4. save to restaurant database
        const insertDataQuery = `INSERT into restaurant (restaurant_name, restaurant_email_id, restaurant_password, restaurant_location, restaurant_image )
              VALUES ('${name}', '${email}', '${hashedPassword}', '${location}', '${avatar}')`;

        dbPool.query(insertDataQuery, (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Server Error");
          }
          //Pass the jsonwebtoken for that restaurant
          const payload = {
            user: {
              id: email,
              usertype: "restaurant"
            }
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 6000000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token, id: result.insertId });
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
