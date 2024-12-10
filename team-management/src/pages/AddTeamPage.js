import React from 'react';
import TeamForm from '../components/TeamForm'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/AddTeamPage.css'; 

const AddTeamPage = () => {
  const navigate = useNavigate(); 

  const handleAddTeam = (teamData) => {
    axios
      .post('http://localhost:5000/api/teams', teamData)
      .then((response) => {
        console.log('Team added:', response.data);
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error adding team:', error);
        alert('Failed to add the team. Please try again.');
      });
  };

  return (
    <div className="add-team-page">
      <h2>Add New Team</h2>
      <TeamForm onSubmit={handleAddTeam} /> {/* Use the updated TeamForm */}
    </div>
  );
};

export default AddTeamPage;
