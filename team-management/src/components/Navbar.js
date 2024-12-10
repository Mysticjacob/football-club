import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">
          <Link to="/" className="navbar-logo-link">Football Club</Link>
        </h2>

        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-team" className="navbar-link">Add Team</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
