import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchList from '../components/MatchList';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch all matches
    axios.get('http://localhost:5000/api/matches')
      .then((response) => setMatches(response.data))
      .catch((error) => console.error('Error fetching matches:', error));
  }, []);

  const handleDelete = (id) => {
    // Delete a match
    axios.delete(`http://localhost:5000/api/matches/${id}`)
      .then(() => {
        setMatches(matches.filter((match) => match._id !== id));
      })
      .catch((error) => console.error('Error deleting match:', error));
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Match Management</h1>
        <Link to="/add-match" className="add-match-button">Add New Match</Link>
      </header>
      <MatchList matches={matches} handleDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
