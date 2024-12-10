import React from 'react';
import '../styles/PlayerList.css';

const PlayerList = ({ players, handleDelete, handleEdit }) => {
  return (
    <div className="player-list">
      {players.map((player) => (
        <div key={player._id} className="player-card">
          <div className="player-info">
            <h3>{player.name}</h3>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Goals:</strong> {player.stats.goals}</p>
            <p><strong>Assists:</strong> {player.stats.assists}</p>
            <p><strong>Appearances:</strong> {player.stats.appearances}</p>
          </div>
          <div className="button-group">
            <button className="edit-btn" onClick={() => handleEdit(player)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(player._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
