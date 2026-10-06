// Bring in tools
const express = require('express');
const router = express.Router();

// Bring in controller
const taskController = require('../controllers/taskController');

// POST / means make a new task
router.post('/', taskController.createTask);

// GET / means get all tasks
router.get('/', taskController.getAllTasks);

// GET /abc123 means get one task
router.get('/:id', taskController.getTaskById);

// PUT /abc123 means change one task
router.put('/:id', taskController.updateTask);

// DELETE /abc123 means remove one task
router.delete('/:id', taskController.deleteTask);

// Share routes
module.exports = router;
