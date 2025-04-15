// routes.js
const express = require('express');
const router = express.Router();
const { Task, create, getAll, updateTask, deleteTask } = require('./models/task.model');
const { validateTask } = require('./schemas/task.validation.schema'); 

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

router.get('/status', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Create a task
router.post('/tasks', async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
  }

  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    return res.status(201).json(savedTask);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

// Get all tasks
router.get('/tasks', (req, res) => {
  res.json(Task.getAll());
});

router.put('/tasks/:id', (req, res) => {
  const { error } = validateTask(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
  }

  try {
    let updatedTask = Task.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  }
  catch(err) {
    res.status(500).json({ message: 'Error updating task', error: err })
  }
});

router.delete('/tasks/:id', (req, res) => {
  const success = Task.deleteTask(req.params.id);
  if (success) {
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
