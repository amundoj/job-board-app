const express = require('express');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./auth');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); 
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Use job routes
app.use('/api', jobRoutes);

// Authentication Routes
app.use('/api/auth', authRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
