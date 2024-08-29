const express = require('express');
const router = express.Router();
const client = require('../db'); 
const { generateCode, sendVerificationEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');
const codes = {}; // This will store codes in memory for simplicity (use a database or Redis in production)

// POST request for user registration
router.post('/register', async (req, res) => {
  const { email, username, password, phone_no } = req.body;

  try {
    // Check if the user already exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const userCheckResult = await client.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Proceed to register the user
    const insertUserQuery = `
      INSERT INTO users (email, username, password, phone_no)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const newUser = await client.query(insertUserQuery, [email, username, password, phone_no]);

    // Generate and send verification code
    const code = generateCode();
    codes[email] = code; // Store code in memory
    await sendVerificationEmail(email, code);

    // Return the newly registered user (without the password)
    const { password: _, ...userWithoutPassword } = newUser.rows[0];
    res.status(201).json({ user: userWithoutPassword, message: 'Verification code sent to email.' });

  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify', async (req, res) => {
  const { email, code } = req.body;

  try {
    // Check if the code is correct
    if (codes[email] && codes[email] === code) {
      // Update the user's verified status
      const updateUserQuery = `
        UPDATE users
        SET verified = true
        WHERE email = $1
        RETURNING *;
      `;
      const updatedUser = await client.query(updateUserQuery, [email]);

      // Delete the code from memory (clean up)
      delete codes[email];

      // Generate a JWT token
      const token = jwt.sign(
        { email: updatedUser.rows[0].email },
        "myjwtsecret",
        { expiresIn: '1h' }
      );

      // Send back the token and user data
      res.status(200).json({ token, user: updatedUser.rows[0] });

    } else {
      return res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (err) {
    console.error('Error during verification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
