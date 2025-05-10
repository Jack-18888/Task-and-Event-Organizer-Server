// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname + '../.env')})

router.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET; // Replace with a strong, secret key

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const newUser = await User.create(username, password);
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to register user.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to login.' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.', userId: req.user.userId });
});

module.exports = router;