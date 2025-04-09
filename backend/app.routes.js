// routes.js
const express = require('express');
const router = express.Router();
const Task = require('./models/task.model');
const { validateTask } = require('./schemas/task.validation.schema'); 

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

router.get('/status', (req, res) => {
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
router.post('/tasks', async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
  }

  try {
    const newTask = Task.create(req.body);
    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

// Get all tasks
router.get('/tasks', (req, res) => {
  res.json(Task.getAll());
});

router.put('/tasks/:id', validateTask, (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    })
    .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
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
