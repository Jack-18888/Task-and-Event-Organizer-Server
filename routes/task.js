const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Get all tasks for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.getAllByUser(req.user.userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks.' });
  }
});

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  const { title, dueDate, completed } = req.body;
  try {
    const task = await Task.create(req.user.userId, title, dueDate, completed);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task.' });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Task.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task.' });
  }
});

// Delete task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Task.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task.' });
  }
});

module.exports = router;
