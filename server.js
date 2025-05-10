// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const eventRoutes = require('./routes/event');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});