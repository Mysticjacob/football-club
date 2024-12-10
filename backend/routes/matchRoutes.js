const express = require("express");
const {
  getMatches,
  addMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchController");
const router = express.Router();

// Routes for Matches
router.route("/").get(getMatches).post(addMatch);
router.route("/:id").put(updateMatch).delete(deleteMatch); // :id for update and delete

module.exports = router;
