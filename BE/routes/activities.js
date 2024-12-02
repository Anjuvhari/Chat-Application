const express = require("express");
const auth = require("../middleware/auth");
const Activity = require("../models/Activity");

const router = express.Router();

// Create Activity
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const activity = new Activity({ title, description, user: req.user._id });
    await activity.save();
    res.send(activity);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Activities
router.get("/", auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id });
    res.send(activities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
