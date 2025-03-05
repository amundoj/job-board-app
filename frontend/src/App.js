import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';

const App = () => {
  return (
    <div>
      <h1>Job Board</h1>
      <Register />
      <Login />
      <PostJob />
      <Jobs />
    </div>
  );
};

export default App;