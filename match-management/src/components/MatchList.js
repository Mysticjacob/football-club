import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MatchList.css';

const MatchList = ({ matches, handleDelete }) => {
  return (
    <div className="match-list">
      <h2>Matches</h2>
      {matches.length === 0 ? (
        <p>No matches available.</p>
      ) : (
        matches.map((match) => (
          <div key={match._id} className="match-card">
            <p className="match-title">
              {match.team1.name} <strong>vs</strong> {match.team2.name}
            </p>
            <p className="match-date">
              <strong>Date:</strong> {new Date(match.date).toLocaleDateString()}
            </p>
            <div className="match-actions">
              <Link to={`/edit-match/${match._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(match._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchList;
