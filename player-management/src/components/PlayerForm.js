import React, { useState } from 'react';
import '../styles/PlayerForm.css';

const PlayerForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [stats, setStats] = useState({ goals: 0, assists: 0, appearances: 0 });

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, position, stats });
  };

  return (
    <form className="player-form" onSubmit={onSubmit}>
      <h2>Add Player</h2>
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
      <div className="stats">
        <input 
          type="number" 
          placeholder="Goals" 
          value={stats.goals} 
          onChange={(e) => setStats({ ...stats, goals: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Assists" 
          value={stats.assists} 
          onChange={(e) => setStats({ ...stats, assists: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Appearances" 
          value={stats.appearances} 
          onChange={(e) => setStats({ ...stats, appearances: e.target.value })} 
        />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;
