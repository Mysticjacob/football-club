import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/TeamList.css';

const TeamList = ({ teams, handleDelete }) => {
  return (
    <div className="team-list">
      <h2>Team List</h2>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        teams.map((team) => (
          <div key={team._id} className="team-card">
            <h3 className="team-name">{team.name}</h3>
            <p><strong>Coach:</strong> {team.coach}</p>
            <p><strong>Players:</strong></p>
            <ul className="player-list">
              {team.players.map((player) => (
                <li key={player._id}>{player.name}</li>
              ))}
            </ul>
            <div className="team-actions">
              <Link to={`/edit-team/${team._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(team._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TeamList;
