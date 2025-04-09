// routes.js
const express = require('express');
const router = express.Router();
const Task = require('./models/task.model');
// const { deleteTask } = require('./models/task.model');

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

router.get('/api/status', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// const tasks = [
//   { id: 1, name: 'Task 1', description: 'Description for task 1', dueDate: '2025-04-01' },
//   { id: 2, name: 'Task 2', description: 'Description for task 2', dueDate: '2025-04-02' },
// ];

// router.get('/api/tasks', (req, res) => {
//   res.json({tasks});
// });

// // route to create task
// router.post('/api/tasks', async (req, res) => {
//   try {
//     const { title, description, dueDate } = req.body;
//     const task = new Task({
//       title,
//       description,
//       dueDate,
//     });

//     await task.save();
//     res.status(201).json(task); // Respond with task data
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// In lieu of DB connection, use below for local testing
// Create a task
router.post('/api/tasks', (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = Task.create({ title, description, dueDate });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Get all tasks
router.get('/api/tasks', (req, res) => {
  res.json(Task.getAll());
});

router.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTaskData = req.body;

  const updatedTask = Task.updateTask(id, updatedTaskData);

  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(updatedTask);
});

router.delete('/api/tasks/:id', (req, res) => {
  const success = Task.deleteTask(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
