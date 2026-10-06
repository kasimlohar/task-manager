// Bring in Task model
const Task = require('../models/Task');
// Bring in mongoose to check id
const mongoose = require('mongoose');

// Make a new task
async function createTask(req, res) {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const priority = req.body.priority;

    const newTask = new Task({
      title: title,
      description: description,
      status: status,
      priority: priority
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    // If input is bad, send first friendly message
    if (error.name === 'ValidationError') {
      const keys = Object.keys(error.errors);
      const firstKey = keys[0];
      const firstMessage = error.errors[firstKey].message;
      return res.status(400).json({ message: firstMessage });
    }
    // For other problems, send simple message
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all tasks, newest first
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get one task by id
async function getTaskById(req, res) {
  try {
    const id = req.params.id;

    // Check if id looks like a MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findById(id);

    // If no task with that id, say not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Change a task
async function updateTask(req, res) {
  try {
    const id = req.params.id;

    // Check if id looks like a MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    // Update task and check rules again
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    // If no task with that id, say not found
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    // If input is bad, send first friendly message
    if (error.name === 'ValidationError') {
      const keys = Object.keys(error.errors);
      const firstKey = keys[0];
      const firstMessage = error.errors[firstKey].message;
      return res.status(400).json({ message: firstMessage });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Remove a task
async function deleteTask(req, res) {
  try {
    const id = req.params.id;

    // Check if id looks like a MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    // If no task with that id, say not found
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Share it
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
