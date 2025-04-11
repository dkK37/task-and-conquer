// backend/schemas/task.schema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
    title: { 
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    completed: { 
      type: Boolean, 
      default: false 
    }
  }, 
  {
    timestamps: true
  }
);

module.exports = taskSchema;
