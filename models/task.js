// backend/models/task.js
const db = require('../database');

const Task = {
  create: async (userId, title, dueDate, completed = false) => {
    const result = await db.query(
      'INSERT INTO tasks (user_id, title, due_date, completed) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, dueDate, completed]
    );
    return result.rows[0];
  },

  getAllByUser: async (userId) => {
    const result = await db.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date',
      [userId]
    );
    return result.rows;
  },

  update: async (taskId, updates) => {
    const { title, dueDate, completed } = updates;
    const result = await db.query(
      'UPDATE tasks SET title = $1, due_date = $2, completed = $3 WHERE id = $4 RETURNING *',
      [title, dueDate, completed, taskId]
    );
    return result.rows[0];
  },

  delete: async (taskId) => {
    await db.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    return { message: 'Task deleted successfully.' };
  }
};

module.exports = Task;
