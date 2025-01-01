// // backend/routes/userRoutes.js
// // -----------------------------------------------------------------------------
// // This file holds routes for user registration (and in the next step, login).
// // -----------------------------------------------------------------------------

// import express from 'express';
// import User from '../models/User.js';  // Import our User model

// const router = express.Router();

// /**
//  * POST /api/register
//  * This route creates a new user and hashes the password automatically.
//  * Expects { username, password } in the request body.
//  */
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if username or password is missing
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required.' });
//     }

//     // Check if the username already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(409).json({ error: 'Username already taken.' });
//     }

//     // Create a new user with the provided username/password
//     const newUser = new User({ username, password });
//     await newUser.save();

//     // We do NOT return the password to the client, even if hashed.
//     return res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         // you can return an ID or any other safe fields
//         id: newUser._id,
//         username: newUser.username
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ error: 'Internal server error during registration.' });
//   }
// });



// /**
//  * POST /api/login
//  * This route checks if a user exists and if their password is correct.
//  * Expects { username, password } in the request body.
//  */
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Basic validation
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required.' });
//     }

//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     // Compare provided password with stored (hashed) password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     // If we reach here, the password is correct
//     return res.status(200).json({
//       message: 'Login successful!',
//       user: {
//         id: user._id,
//         username: user.username
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Internal server error during login.' });
//   }
// });

// // export default router;
// export const userRoutes = router;









// ********************************************************************************





// backend/routes/userRoutes.js
// -----------------------------------------------------------------------------
// Routes for registering, logging in, and logging out.
// Uses session-based authentication. On login, we set req.session.user.
// -----------------------------------------------------------------------------

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/register
 * Expects { username, password } in req.body
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }
    // Create user
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({
      message: 'User registered successfully!',
      user: { _id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

/**
 * POST /api/login
 * Expects { username, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    // Create session
    req.session.user = { _id: user._id, username: user.username };
    return res.status(200).json({
      message: 'Login successful!',
      user: { _id: user._id, username: user.username },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

/**
 * GET /api/logout
 * Destroys the session
 */
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully!' });
  });
});

export { router as userRoutes };
