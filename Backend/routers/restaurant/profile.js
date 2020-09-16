const express = require("express");
const router = express.Router();
const dbPool = require("../../config/db");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

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

// @route  GET yelp/restaurant/profile/res_id
// @desc   Get restaurant profile details using restaurant id
// @access Public
router.get("/:res_id", (req, res) => {
  const res_id = req.params.res_id;

  try {
    const findResQuery = `SELECT * FROM restaurant WHERE restaurant_id = '${res_id}'`;

    dbPool.query(findResQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "restaurant not found" }] });
      }
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route  Update yelp/restaurant/profile/basic
// @desc   Update current restaurant basic details
// @access Private
router.post(
  "/basic",
  [
    auth,
    [
      check("restaurant_name", "Restaurant name is required").notEmpty(),
      check("restaurant_email_id", "Restaurant email is required")
        .isEmail()
        .notEmpty(),
      check("restaurant_location", "Restaurant location is required").notEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const res_id = req.user.id;
    const {
      restaurant_name,
      restaurant_email_id,
      restaurant_location,
      restaurant_phone,
      description,
      timings
    } = req.body;

    try {
      const updateCustomerQuery = `UPDATE restaurant set restaurant_name = '${restaurant_name}', 
      restaurant_email_id = '${restaurant_email_id}', restaurant_location = '${restaurant_location}', 
      restaurant_phone = '${restaurant_phone}', description = '${description}', 
      timings = '${timings}' WHERE restaurant_id = ${res_id}`;

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
  }
);

// @route  POST yelp/restaurant/profile/contact
// @desc   Update current restaurant contact information
// @access Private
router.post(
  "/contact",
  [
    auth,
    [
      check("restaurant_email_id", "Restaurant email is required.")
        .notEmpty()
        .isEmail()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurant_id = req.user.id;
    const { restaurant_email_id, restaurant_phone } = req.body;

    try {
      const contactUpdateQuery = `UPDATE restaurant set restaurant_email_id='${restaurant_email_id}', 
      restaurant_phone='${restaurant_phone}' WHERE restaurant_id = ${restaurant_id}`;

      dbPool.query(contactUpdateQuery, (error, result) => {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(500).send("Server Error");
        }
        res.status(200).send("Contact details updated.");
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route  POST yelp/restaurant/profile/menu
// @desc   Insert current restaurant menu item
// @access Private
router.post(
  "/menu",
  [
    auth,
    [
      check("item_name", "Dish name is required").notEmpty(),
      check(
        "item_ingredients",
        "Dish main ingredients are required"
      ).notEmpty(),
      check("item_category", "Dish category is required").notEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurant_id = req.user.id;
    const {
      item_name,
      item_ingredients,
      item_price,
      item_description,
      item_category
    } = req.body;

    try {
      const addItemQuery = `INSERT into menu_items (item_name, item_ingredients, item_price, item_description, item_category, restaurant_id) 
      VALUES ('${item_name}','${item_ingredients}',${item_price},'${item_description}','${item_category}', ${restaurant_id})`;

      dbPool.query(addItemQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Database Error");
        }
        res.status(200).send("Dish details added.");
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT yelp/restaurant/profile/menu/item_id
// @desc   Update current restaurant menu item
// @access Private
router.put(
  "/menu/:item_id",
  [
    auth,
    [
      check("item_name", "Dish name is required").notEmpty(),
      check(
        "item_ingredients",
        "Dish main ingredients are required"
      ).notEmpty(),
      check("item_category", "Dish category is required").notEmpty()
    ]
  ],
  (req, res) => {
    const item_id = req.params.item_id;
    const restaurant_id = req.user.id;

    const {
      item_name,
      item_ingredients,
      item_price,
      item_description,
      item_category
    } = req.body;

    try {
      const updateItemQuery = `UPDATE menu_items set item_name = '${item_name}', 
      item_ingredients = '${item_ingredients}', item_price=${item_price}, 
      item_description='${item_description}', item_category='${item_category}', 
      restaurant_id=${restaurant_id} WHERE (item_id=${item_id})`;

      dbPool.query(updateItemQuery, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Database Error");
        }
        res.status(200).send("Dish details updated.");
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET yelp/restaurant/profile/menu
// @desc   Get all the items added by current restaurant using res_id
// @access Public
router.get("/menu/:res_id", (req, res) => {
  const res_id = req.params.res_id;
  try {
    const getMenuQuery = `SELECT * FROM menu_items WHERE (restaurant_id=${res_id})`;

    dbPool.query(getMenuQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Database Error");
      }
      if (result.length == 0) {
        return res
          .status(201)
          .json({ errors: [{ msg: "Menu details not added" }] });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
