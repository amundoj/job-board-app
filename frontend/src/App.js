import React from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';

 const App = () => {
   return (
     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
       <h1>Jobb på Finn</h1>
       <Register />
       <Login />
       <PostJob />
       <Jobs />
     </div>
   );
 };

 export default App;