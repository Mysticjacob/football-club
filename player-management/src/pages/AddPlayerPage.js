import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PlayerForm.css';

const AddPlayerPage = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [goals, setGoals] = useState('');
  const [assists, setAssists] = useState('');
  const [appearances, setAppearances] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !position || !goals || !assists || !appearances) {
      setError("All fields are required!");
      return;
    }

    const newPlayer = {
      name,
      position,
      stats: {
        goals: parseInt(goals),
        assists: parseInt(assists),
        appearances: parseInt(appearances),
      },
    };

    axios
      .post('http://localhost:5000/api/players', newPlayer)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error("Error adding player:", error);
        setError("Failed to add player. Please try again.");
      });
  };

  return (
    <div className="player-form-container">
      <h2>Add New Player</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="player-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <div className="stats-inputs">
          <input
            type="number"
            placeholder="Goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Assists"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Appearances"
            value={appearances}
            onChange={(e) => setAppearances(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayerPage;
