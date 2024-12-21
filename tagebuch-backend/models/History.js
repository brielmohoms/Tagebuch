// models/History.js
const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("History", HistorySchema);
