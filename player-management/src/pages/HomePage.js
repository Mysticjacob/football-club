import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerList from '../components/PlayerList';
import '../styles/HomePage.css';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/players')
      .then((response) => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the players:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/players/${id}`)
      .then(() => {
        setPlayers(players.filter(player => player._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting player:", error);
      });
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    // Optionally, redirect to a new page or open a modal with the form
  };

  const handleUpdate = (updatedPlayer) => {
    axios.put(`http://localhost:5000/api/players/${updatedPlayer._id}`, updatedPlayer)
      .then((response) => {
        setPlayers(players.map(player =>
          player._id === updatedPlayer._id ? response.data : player
        ));
        setEditingPlayer(null);
      })
      .catch((error) => {
        console.error("Error updating player:", error);
      });
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  return (
    <div className="home-page">
      <h2>Players List</h2>
      <PlayerList players={players} handleDelete={handleDelete} handleEdit={handleEdit} />
      
      {editingPlayer && (
        <div className="edit-player-form">
          <h2>Edit Player</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(editingPlayer);
          }}>
            <input
              type="text"
              value={editingPlayer.name}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
              placeholder="Player Name"
              required
            />
            <input
              type="text"
              value={editingPlayer.position}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, position: e.target.value })}
              placeholder="Position"
              required
            />
            <div className="stats">
              <input
                type="number"
                value={editingPlayer.stats.goals}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, goals: e.target.value } })}
                placeholder="Goals"
              />
              <input
                type="number"
                value={editingPlayer.stats.assists}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, assists: e.target.value } })}
                placeholder="Assists"
              />
              <input
                type="number"
                value={editingPlayer.stats.appearances}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, stats: { ...editingPlayer.stats, appearances: e.target.value } })}
                placeholder="Appearances"
              />
            </div>
            <button type="submit">Update Player</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
