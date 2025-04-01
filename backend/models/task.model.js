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
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
