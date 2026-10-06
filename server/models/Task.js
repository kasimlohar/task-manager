// Bring in mongoose tool
const mongoose = require('mongoose');

// Make rules for a task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is needed'],
      trim: true,
      minlength: [3, 'Title must be at least 3 letters'],
      maxlength: [100, 'Title must be less than 100 letters']
    },
    description: {
      type: String,
      maxlength: [500, 'Description must be less than 500 letters']
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  },
  {
    timestamps: true
  }
);

// Make model from rules
const Task = mongoose.model('Task', taskSchema);

// Share it
module.exports = Task;
