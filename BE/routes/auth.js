const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists");

    const user = new User({ username, password });
    await user.save();

    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username or password");

    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.header("Authorization", token).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
