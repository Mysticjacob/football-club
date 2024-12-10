import React from 'react';
import '../styles/PlayerCard.css';

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Position: {player.position}</p>
      <p>Goals: {player.stats.goals}</p>
      <p>Assists: {player.stats.assists}</p>
      <p>Appearances: {player.stats.appearances}</p>
    </div>
  );
};

export default PlayerCard;
