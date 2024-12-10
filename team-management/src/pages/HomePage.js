import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamList from '../components/TeamList';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../styles/HomePage.css';

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch the list of teams from the backend
    axios.get('http://localhost:5000/api/teams')
      .then(response => setTeams(response.data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/teams/${id}`)
      .then(() => {
        setTeams(teams.filter(team => team._id !== id));
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
  };

  const handleEdit = (team) => {
    // Navigate to the Edit Team Page, passing the team ID as a parameter in the URL
    navigate(`/edit-team/${team._id}`);
  };

  return (
    <div className="home-page">
      <h2>Teams List</h2>
      <TeamList teams={teams} handleDelete={handleDelete} handleEdit={handleEdit} />
      <button onClick={() => window.location.href = '/add-team'}>Add Team</button>
    </div>
  );
};

export default HomePage;
