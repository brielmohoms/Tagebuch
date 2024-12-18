const express = require("express");
const router = express.Router();
const History = require("../models/History");

// Fetch History Entry by Date
router.get("/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const entry = await History.findOne({
      userId: req.user.id,
      date,
    });

    if (!entry) return res.status(404).json({ message: "No history entry found" });

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Save or Update History Entry
router.post("/save", async (req, res) => {
  const { date, content } = req.body;

  if (!date) return res.status(400).json({ message: "Date is required" });

  try {
    let entry = await History.findOne({ userId: req.user.id, date });

    if (entry) {
      entry.content = content;
      await entry.save();
    } else {
      entry = new History({
        userId: req.user.id,
        date,
        content,
      });
      await entry.save();
    }

    res.status(200).json({ message: "History entry saved successfully", entry });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;