// backend/models/user.js
const db = require('../database');
const bcrypt = require('bcrypt');

const User = {
  findByUsername: async (username) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    return result.rows[0];
  },

  comparePassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};

module.exports = User;