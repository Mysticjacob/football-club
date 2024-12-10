import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MatchForm.css'; 

const EditMatchForm = ({ match, onSubmit }) => {
  const [date, setDate] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [allTeams, setAllTeams] = useState([]);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (match) {
      setDate(match.date);  
      setTeam1(match.team1._id);  
      setTeam2(match.team2._id);  
    }

    // Fetch all teams
    axios.get('http://localhost:5000/api/teams')
      .then((response) => {
        setAllTeams(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
        setLoading(false);
      });
  }, [match]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMatch = { date, team1, team2 };
    onSubmit(updatedMatch);  // Pass the updated match data to the parent component
  };

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <h2>{match ? 'Edit Match' : 'Edit Match'}</h2>

      <div className="form-group">
        <label>Match Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Team 1:</label>
        {loading ? (
          <p>Loading teams...</p> // Show loading message while fetching teams
        ) : (
          <select
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            required
          >
            <option value="">Select Team 1</option>
            {allTeams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-group">
        <label>Team 2:</label>
        {loading ? (
          <p>Loading teams...</p> // Show loading message while fetching teams
        ) : (
          <select
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            required
          >
            <option value="">Select Team 2</option>
            {allTeams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button type="submit">{match ? 'Update Match' : 'Update Match'}</button>
    </form>
  );
};

export default EditMatchForm;
