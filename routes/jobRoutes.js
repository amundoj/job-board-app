const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get all jobs
router.get('/jobs', auth, (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ msg: 'Database error' });
    }
    res.json({ message: 'Jobs fetched successfully', jobs: results });
  });
});

// Post a job
router.post('/jobs', auth, (req, res) => {
  console.log('POST /api/jobs hit'); // Debug log
  const { title, description } = req.body;
  const userId = req.user.id;
  const job = { title, description, user_id: userId };

  db.query('INSERT INTO jobs SET ?', job, (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ msg: 'Error posting job' });
    }
    res.status(201).json({ msg: 'Job posted', jobId: result.insertId });
  });
});

// Update a job
router.put('/jobs/:id', auth, (req, res) => {
  const { title, description } = req.body;
  const jobId = req.params.id;
  const userId = req.user.id;

  db.query('UPDATE jobs SET title = ?, description = ? WHERE id = ? AND user_id = ?', 
    [title, description, jobId, userId], (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ msg: 'Error updating job' });
      }
      if (result.affectedRows === 0) {
        return res.status(403).json({ msg: 'Job not found or not authorized' });
      }
      res.json({ msg: 'Job updated' });
    });
});

// Delete a job
router.delete('/jobs/:id', auth, (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;

  db.query('DELETE FROM jobs WHERE id = ? AND user_id = ?', [jobId, userId], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ msg: 'Error deleting job' });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ msg: 'Job not found or not authorized' });
    }
    res.json({ msg: 'Job deleted' });
  });
});

module.exports = router;