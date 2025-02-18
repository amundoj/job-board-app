const express = require('express');
const router = express.Router();
const { getJobs } = require('../controllers/jobController');

// Route to get all jobs
router.get('/jobs', getJobs);

module.exports = router;
