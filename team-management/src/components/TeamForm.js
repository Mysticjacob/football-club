import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TeamForm.css';

const TeamForm = ({ team, onSubmit }) => {
  const [name, setName] = useState('');
  const [coach, setCoach] = useState('');
  const [players, setPlayers] = useState([]);  // Array to store selected player IDs
  const [allPlayers, setAllPlayers] = useState([]);  // All available players
  const [loading, setLoading] = useState(true); // Loading state for players

  useEffect(() => {
    // If the form is in edit mode, pre-fill the data
    if (team) {
      setName(team.name);
      setCoach(team.coach);
      setPlayers(team.players.map(player => player._id)); // Pre-fill selected players
    }

    // Fetch all players and sort them alphabetically
    axios.get('http://localhost:5000/api/players')
      .then((response) => {
        const sortedPlayers = response.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
        setAllPlayers(sortedPlayers);
        setLoading(false);  // Set loading to false once players are loaded
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
        setLoading(false);  // Set loading to false if there's an error
      });
  }, [team]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTeam = { name, coach, players };
    onSubmit(updatedTeam);  // Submit the form to the parent component
  };

  const handlePlayerChange = (e) => {
    const selectedPlayerId = e.target.value;
    if (e.target.checked) {
      setPlayers([...players, selectedPlayerId]);  // Add selected player ID
    } else {
      setPlayers(players.filter(id => id !== selectedPlayerId));  // Remove unselected player ID
    }
  };

  return (
    <form className="team-form" onSubmit={handleSubmit}>
      <h2>{team ? 'Edit Team' : 'Add New Team'}</h2>

      <div className="form-group">
        <label>Team Name:</label>
        <input
          type="text"
          placeholder="Enter team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Coach Name:</label>
        <input
          type="text"
          placeholder="Enter coach name"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Pick Your Players:</label>
        {loading ? (
          <p>Loading players...</p>  // Show loading message while fetching players
        ) : (
          <div className="players-list">
            {allPlayers.map((player) => (
              <div key={player._id} className="player-checkbox">
                <input
                  type="checkbox"
                  value={player._id}
                  checked={players.includes(player._id)}  // Check if the player is selected
                  onChange={handlePlayerChange}
                />
                <label>{player.name}</label> {/* Display player name */}
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit">{team ? 'Update Team' : 'Add Team'}</button>
    </form>
  );
};

export default TeamForm;
