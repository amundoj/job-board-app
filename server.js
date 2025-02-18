const express = require('express');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Use job routes
app.use('/api', jobRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
