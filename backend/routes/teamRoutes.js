const express = require("express");
const {
  getTeams,
  addTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");
const router = express.Router();

router.route("/").get(getTeams).post(addTeam);
router.route("/:id").put(updateTeam).delete(deleteTeam);

module.exports = router;
