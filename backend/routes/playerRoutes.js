const express = require("express");
const { getPlayers, addPlayer, deletePlayer, updatePlayer } = require("../controllers/playerController");
const router = express.Router();

router.route("/").get(getPlayers).post(addPlayer);
router.route("/:id")
  .put(updatePlayer) 
  .delete(deletePlayer); 

module.exports = router;
