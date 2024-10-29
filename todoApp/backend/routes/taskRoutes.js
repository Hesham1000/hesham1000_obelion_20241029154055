```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
});

// POST /api/tasks - Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await taskController.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
});

// PUT /api/tasks/:id - Update an existing task
router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;
    const updatedTask = await taskController.updateTask(taskId, updatedData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskController.deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;
```

Model File:
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Low',
  },
});

module.exports = Task;
```

Database Configuration:
```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;
```