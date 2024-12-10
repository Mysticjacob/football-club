const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  date: { type: Date, required: true },
  score: { team1: Number, team2: Number },
});

module.exports = mongoose.model("Match", matchSchema);
