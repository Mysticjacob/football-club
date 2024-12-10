import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/" className="navbar-link">Match Manager</Link>
        </h1>
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/add-match" className="navbar-link">Add Match</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
