// backend/models/task.model.js
const mongoose = require('mongoose');
const taskSchema = require('../schemas/task.schema');  // Import schema

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
// const Task = mongoose.model('Task', taskSchema);

// For testing without connection to DB: comment line above and uncomment block below
let tasks = []; // Temporary in-memory array
class Task {
  constructor(title, description, dueDate) {
    this.id = tasks.length + 1; // Simple auto-incrementing ID
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(taskData) {
    const newTask = new Task(taskData.title, taskData.description, taskData.dueDate);
    tasks.push(newTask);
    return newTask;
  }

  static getAll() {
    return tasks;
  }
}

module.exports = Task;
