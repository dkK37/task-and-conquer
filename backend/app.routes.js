// routes.js
const express = require('express');
const router = express.Router();
const { Task, create, getAll, updateTask, deleteTask } = require('./models/task.model');
const { validateTask } = require('./schemas/task.validation.schema'); 

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

// POST Create a new task
router.post('/tasks', async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
  }

  try {
    let task = new Task(req.body);
    const savedTask = await task.save();
    return res.status(201).json(savedTask);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

// GET all tasks 
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

// GET single task by id
router.get('/tasks/:id', async (req,res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID format' });
  try {
    const task = await Task.findById(res.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found'});
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err});
  }
})

// PUT update single task
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

// DELETE single task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

module.exports = router;
