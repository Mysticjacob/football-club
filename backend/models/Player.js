const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  stats: { goals: Number, assists: Number, appearances: Number },
});

module.exports = mongoose.model("Player", playerSchema);
