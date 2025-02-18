const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('./db');
const router = express.Router();

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
      // Check if the user already exists in the database
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
          return res.status(500).json({ msg: 'Database query failed' });
        }

        if (result.length > 0) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user in the database
        const newUser = { name, email, password: hashedPassword };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) {
            return res.status(500).json({ msg: 'Error saving user to the database' });
          }

          // Generate a JWT token
          const payload = {
            user: {
              id: result.insertId,
            },
          };
          const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

          // Send the token as the response
          res.status(201).json({ msg: 'User registered', token });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
