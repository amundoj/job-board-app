const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Add this
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./auth');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('Env file path:', path.resolve(__dirname, '.env'));
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'x-auth-token'] // Allowed headers
}));

app.use(express.json());
const port = process.env.PORT || 5000;

// Use job routes
app.use('/api', jobRoutes);

// Authentication Routes
app.use('/api/auth', authRoutes);

// Error middleware (after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});