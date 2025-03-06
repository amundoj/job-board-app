import React from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';

const App = () => {
  return (
    <div className="container">
      <h1>JobbHub</h1> {/* New name to avoid Finn.no branding */}
      <Register />
      <Login />
      <PostJob />
      <Jobs />
    </div>
  );
};

export default App;