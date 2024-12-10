import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2>Football Club</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-player">Add Player</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
