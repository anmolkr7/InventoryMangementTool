import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// POST /login - User authentication
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const foundUser = await User.findOne({ username }).select('+password');
    if (!foundUser) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await foundUser.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // --- DEBUGGING ---
    console.log("--- Creating Token ---");
    console.log("JWT Secret used for signing:", process.env.JWT_SECRET);
    // --- END DEBUGGING ---

    // Increased expiration to 24h to avoid timezone issues during testing
    const authToken = jwt.sign(
        { userId: foundUser._id, username: foundUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Changed to 24 hours
    );

    return res.status(200).json({ token: authToken });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /register - User registration
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already registered' });
    }
    
    const newUser = new User({ email, username, password });
    await newUser.save();

    const authToken = newUser.generateJWT();

    return res.status(201).json({ token: authToken });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};
