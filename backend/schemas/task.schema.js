// backend/schemas/task.schema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = taskSchema;
