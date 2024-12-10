import React from 'react';
import MatchForm from '../components/MatchForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMatchPage = () => {
  const navigate = useNavigate();

  const handleAddMatch = (matchData) => {
    axios.post('http://localhost:5000/api/matches', matchData)
      .then(() => navigate('/')) // Redirect to the Home Page
      .catch((error) => console.error('Error adding match:', error));
  };

  return (
    <div>
      <MatchForm onSubmit={handleAddMatch} />
    </div>
  );
};

export default AddMatchPage;
