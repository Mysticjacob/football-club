const Match = require("../models/Match");

// Get all matches
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate("team1 team2"); // Populate team details
    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ message: "Server error while fetching matches" });
  }
};

// Add a new match
const addMatch = async (req, res) => {
  const { team1, team2, date, score } = req.body;

  // Check if required fields are provided
  if (!team1 || !team2 || !date) {
    return res.status(400).json({ message: "Team1, Team2, and date are required." });
  }

  // Check if team1 and team2 are different
  if (team1 === team2) {
    return res.status(400).json({ message: "Team1 and Team2 cannot be the same." });
  }

  try {
    const newMatch = await Match.create({ team1, team2, date, score });
    res.status(201).json(newMatch);
  } catch (error) {
    console.error("Error creating match:", error.message);
    res.status(400).json({ message: "Error creating match. Please try again." });
  }
};

// Update a match
const updateMatch = async (req, res) => {
  const { team1, team2, date, score } = req.body;

  // Check if required fields are provided
  if (!team1 || !team2 || !date) {
    return res.status(400).json({ message: "Team1, Team2, and date are required." });
  }

  // Check if team1 and team2 are different
  if (team1 === team2) {
    return res.status(400).json({ message: "Team1 and Team2 cannot be the same." });
  }

  try {
    // Find match by ID and update it
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { team1, team2, date, score },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error("Error updating match:", error.message);
    res.status(500).json({ message: "Server error while updating match" });
  }
};

// Delete a match
const deleteMatch = async (req, res) => {
  try {
    // Find match by ID and delete it
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error.message);
    res.status(500).json({ message: "Server error while deleting match" });
  }
};

module.exports = { getMatches, addMatch, updateMatch, deleteMatch };
