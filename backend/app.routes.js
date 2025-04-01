// routes.js
const express = require('express');
const router = express.Router();

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

router.get('/api/status', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

const tasks = [
  { id: 1, name: 'Task 1', description: 'Description for task 1', dueDate: '2025-04-01' },
  { id: 2, name: 'Task 2', description: 'Description for task 2', dueDate: '2025-04-02' },
];

router.get('/api/tasks', (req, res) => {
  res.json({tasks});
});

module.exports = router;
