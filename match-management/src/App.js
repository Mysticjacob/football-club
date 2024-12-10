import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddMatchPage from './pages/AddMatchPage';
import EditMatchPage from './pages/EditMatchPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-match" element={<AddMatchPage />} />
          <Route path="/edit-match/:id" element={<EditMatchPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
