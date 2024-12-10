import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditMatchForm from '../components/EditMatchForm';  

const EditMatchPage = () => {
  const { id } = useParams();  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch the match data based on the match ID
    axios.get(`http://localhost:5000/api/matches/${id}`)
      .then((response) => {
        setMatch(response.data);  // Populate the form with existing match data
        setLoading(false);  // Set loading to false after fetching the data
      })
      .catch((error) => {
        console.error('Error fetching match data:', error);
        setLoading(false);  // Set loading to false in case of error
      });
  }, [id]);  // Re-run effect when match ID changes

  const handleSubmit = (updatedMatchData) => {
    // Update the match data in the backend
    axios.put(`http://localhost:5000/api/matches/${id}`, updatedMatchData)
      .then((response) => {
        console.log('Match updated:', response.data);
        navigate('/');  // Redirect to home page after update
      })
      .catch((error) => {
        console.error('Error updating match:', error);
      });
  };

  return (
    <div className="edit-match-page">
      <h2>Edit Match</h2>
      {loading ? (
        <p>Loading match data...</p>  // Show loading message while fetching the match
      ) : (
        <EditMatchForm match={match} onSubmit={handleSubmit} />  // Pass match data to EditMatchForm
      )}
    </div>
  );
};

export default EditMatchPage;
