const Team = require("../models/Team");

// Get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new team
const addTeam = async (req, res) => {
  const { name, players, coach } = req.body;
  try {
    const newTeam = await Team.create({ name, players, coach });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a team
const updateTeam = async (req, res) => {
  try {
    const { name, coach, players } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, coach, players },
      { new: true, runValidators: true }
    );
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeams, addTeam, updateTeam, deleteTeam };
