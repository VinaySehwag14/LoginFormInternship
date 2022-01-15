const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* register user

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new Admin({
      // adminname: req.body.adminname,
      email: req.body.email,
      password: hashedPassword,
    });

    const admin = await newUser.save();
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);

    res.status(500).json({ err: "admin name is already in use" });
  }
});

//* login user
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    !admin && res.status(400).json("Incorrect Admin name");

    const validated = await bcrypt.compare(req.body.password, admin.password);
    !validated && res.status(400).json("Incorrect Password");

    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "5 minutes", //* expires in 5 minutes
      }
    );

    const { password, ...info } = admin._doc;

    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
