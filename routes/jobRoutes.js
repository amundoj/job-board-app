const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Route to get all jobs
router.get('/jobs', auth, (req, res) => {
  res.json({ message: 'Jobs fetched successfully', jobs: [] });
});

module.exports = router;