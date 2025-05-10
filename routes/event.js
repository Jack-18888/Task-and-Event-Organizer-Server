const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET;

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

// Get all events
router.get('/', authenticateToken, async (req, res) => {
  try {
    const events = await Event.getAllByUser(req.user.userId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve events.' });
  }
});

// Create new event
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, start_time, end_time } = req.body;
  try {
    const newEvent = await Event.create(req.user.userId, title, description, start_time, end_time);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event.' });
  }
});

// Update event
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Event.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event.' });
  }
});

// Delete event
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Event.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event.' });
  }
});

module.exports = router;
