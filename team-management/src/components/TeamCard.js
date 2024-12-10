import React from 'react';
import '../styles/TeamCard.css';

const TeamCard = ({ team, handleEdit, handleDelete }) => {
  return (
    <div className="team-card">
      <h3>{team.name}</h3>
      <p><strong>Coach:</strong> {team.coach}</p>
      <p><strong>Players:</strong> {team.players.length}</p>
      <div className="button-group">
        <button onClick={() => handleEdit(team)}>Edit</button>
        <button onClick={() => handleDelete(team._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TeamCard;
