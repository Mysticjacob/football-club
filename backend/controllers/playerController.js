const Player = require("../models/Player");

// Get all players
const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new player
const addPlayer = async (req, res) => {
  const { name, position, team, stats } = req.body;
  try {
    const newPlayer = await Player.create({ name, position, team, stats });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a player
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a player's details
const updatePlayer = async (req, res) => {
  try {
    const { name, position, team, stats } = req.body;
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { name, position, team, stats },
      { new: true, runValidators: true }
    );
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions
module.exports = { getPlayers, addPlayer, deletePlayer, updatePlayer };
