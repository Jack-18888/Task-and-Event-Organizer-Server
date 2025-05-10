const db = require('../database');

const Event = {
  create: async (userId, title, description, startTime, endTime) => {
    const result = await db.query(
      `INSERT INTO events (user_id, title, description, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, title, description, startTime, endTime]
    );
    return result.rows[0];
  },

  getAllByUser: async (userId) => {
    const result = await db.query(
      'SELECT * FROM events WHERE user_id = $1 ORDER BY start_time',
      [userId]
    );
    return result.rows;
  },

  update: async (eventId, updates) => {
    const { title, description, start_time, end_time } = updates;
    const result = await db.query(
      `UPDATE events
       SET title = $1, description = $2, start_time = $3, end_time = $4
       WHERE id = $5 RETURNING *`,
      [title, description, start_time, end_time, eventId]
    );
    return result.rows[0];
  },

  delete: async (eventId) => {
    await db.query('DELETE FROM events WHERE id = $1', [eventId]);
    return { message: 'Event deleted successfully.' };
  }
};

module.exports = Event;
