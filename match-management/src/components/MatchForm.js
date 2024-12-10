import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MatchForm.css';

const MatchForm = ({ matchData, onSubmit }) => {
  const [date, setDate] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    if (matchData) {
      setDate(matchData.date);
      setTeam1(matchData.team1._id);
      setTeam2(matchData.team2._id);
    }

    axios.get('http://localhost:5000/api/teams')
      .then((response) => setAllTeams(response.data))
      .catch((error) => console.error('Error fetching teams:', error));
  }, [matchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team1 === team2) {
      alert('Team 1 and Team 2 cannot be the same.');
      return;
    }
    onSubmit({ date, team1, team2 });
  };

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <h2>{matchData ? 'Edit Match' : 'Add Match'}</h2>

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
      </div>

      <div className="form-group">
        <label>Team 2:</label>
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
      </div>

      <button type="submit">{matchData ? 'Update Match' : 'Add Match'}</button>
    </form>
  );
};

export default MatchForm;
