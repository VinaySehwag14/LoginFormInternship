const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { check } = require("express-validator");
const { userValidationResult } = require("../validation");
const verify = require("../verifyToken");

//* register user
router.post(
  "/register",

  [
    check("username")
      .trim()
      .not()
      .isEmpty()
      .isAlphanumeric()
      .withMessage("No spaces | Only alphanumeric characters"),
    check("mobile")
      .trim()
      .not()
      .isEmpty()
      .isNumeric()
      .isLength({ max: 10, min: 10 })
      .withMessage("Only numbers"),
    check("email").trim().isEmail().withMessage("Invalid email"),
  ],
  userValidationResult,
  async (req, res) => {
    try {
      const user = new Users({
        username: req.body.username,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
      });
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//*Getting user
router.get("/users", verify, async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//*Delte user

router.delete("/:id", verify, async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted Successfully!!");
    } catch (err) {
      res.status(404).json("User not found!");
    }
  }
});

module.exports = router;
