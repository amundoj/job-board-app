import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';
import JobDetails from './components/JobDetails';

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '20px', background: '#2D3748', padding: '15px', borderRadius: '8px' }}>
          <Link to="/" style={{ color: '#4FD1C5', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>JobbHub</Link>
          <Link to="/post-job" style={{ color: '#FFFFFF', marginRight: '20px', textDecoration: 'none' }}>Post a Job</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;