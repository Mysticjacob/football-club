import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditTeamForm from '../components/EditTeamForm'; // Use the new EditTeamForm component
import '../styles/EditTeamPage.css';

const EditTeamPage = () => {
  const { id } = useParams();  // Get the team ID from the URL params
  const [team, setTeam] = useState(null);  // State to store the team data
  const [loading, setLoading] = useState(true);  // Loading state for fetching team
  const navigate = useNavigate();  // For navigation after form submission

  useEffect(() => {
    // Fetch the team data based on the team ID
    axios.get(`http://localhost:5000/api/teams/${id}`)
      .then((response) => {
        setTeam(response.data);  // Populate the form with existing data
        setLoading(false);  // Set loading to false after fetching the data
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        setLoading(false);  // Set loading to false in case of an error
      });
  }, [id]);  // Re-run effect when team ID changes

  const handleSubmit = (updatedTeamData) => {
    // Update the team data in the backend
    axios.put(`http://localhost:5000/api/teams/${id}`, updatedTeamData)
      .then((response) => {
        console.log('Team updated:', response.data);
        navigate('/');  // Redirect to home page after update
      })
      .catch((error) => {
        console.error('Error updating team:', error);
      });
  };

  return (
    <div className="edit-team-page">
      <h2>Edit Team</h2>
      {loading ? (
        <p>Loading team data...</p>  // Show loading message while fetching the team
      ) : (
        <EditTeamForm team={team} onSubmit={handleSubmit} />  // Pass team data to EditTeamForm
      )}
    </div>
  );
};

export default EditTeamPage;
