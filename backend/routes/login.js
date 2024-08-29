const express = require('express');
const router = express.Router();
const client = require('../db'); // Import the database client
const jwt = require('jsonwebtoken');

// POST request for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Directly compare the password (no hashing)
    if (password !== user.password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({ error: 'Account not verified. Please check your email.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email },
      "myjwtsecret",
      { expiresIn: '1h' }
    );

    // Return the token and user data (excluding the password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ token, user: userWithoutPassword });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
