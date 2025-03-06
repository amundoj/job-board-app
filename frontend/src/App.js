import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';
import JobDetails from './components/JobDetails';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '20px', background: '#2D3748', padding: '15px', borderRadius: '8px' }}>
          <Link to="/" style={{ color: '#4FD1C5', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>JobbHub</Link>
          {isLoggedIn ? (
            <>
              <Link to="/post-job" style={{ color: '#FFFFFF', marginRight: '20px', textDecoration: 'none' }}>Post a Job</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#FFFFFF', marginRight: '20px', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ color: '#FFFFFF', marginRight: '20px', textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;