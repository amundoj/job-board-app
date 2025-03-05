const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./auth');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('Env file path:', path.resolve(__dirname, '.env'));
console.log('JWT_SECRET:', process.env.JWT_SECRET);

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