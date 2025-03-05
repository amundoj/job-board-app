const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('./db');
const router = express.Router(); // Fixed from expressRouter()

// User Registration
router.post(
  '/register',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
          console.error('DB Error:', err);
          return res.status(500).json({ msg: 'Database query failed' });
        }

        if (result.length > 0) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = { name, email, password: hashedPassword };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ msg: 'Error saving user to the database' });
          }

          const payload = { user: { id: result.insertId } };
          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use process.env.JWT_SECRET
          res.status(201).json({ msg: 'User registered', token });
        });
      });
    } catch (err) {
      console.error('Registration Error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// User Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
          console.error('DB Error:', err);
          return res.status(500).json({ msg: 'Database query failed' });
        }

        if (result.length === 0) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: result[0].id } };
        jwt.sign(
          payload,
          process.env.JWT_SECRET, // Use process.env.JWT_SECRET
          { expiresIn: '1h' },
          (err, token) => {
            if (err) {
              console.error('Token generation error:', err);
              return res.status(500).json({ msg: 'Error generating token' });
            }
            console.log('Generated Token:', token);
            res.json({ token });
          }
        );
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;