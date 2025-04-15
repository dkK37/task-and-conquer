// backend/models/task.model.js
const mongoose = require('mongoose');
const taskSchema = require('../schemas/task.schema');

// Define instance methods (methods that operate on individual documents)
taskSchema.methods.markAsComplete = function () {
  this.completed = true;
  return this.save();
};

// Define static methods (methods that operate on the model/collection)
taskSchema.statics.findIncomplete = function () {
  return this.find({ completed: false });
};

// Create the model using the schema
const Task = mongoose.model('Task', taskSchema);
// module.exports = Task;

function create(taskData) {
  const newTask = new Task(taskData.title, taskData.description, taskData.dueDate);
  tasks.push(newTask);
  return newTask;
}

function getAll() {
  return tasks;
}

function updateTask(id, updatedData) {
  const taskIndex = tasks.findIndex(task => task.id === Number(id));
  if (taskIndex === -1) return null;
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
  return tasks[taskIndex];
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex(t => t.id === Number(id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
}
  
module.exports = {
  Task,
  create,
  getAll,
  updateTask,
  deleteTask
};