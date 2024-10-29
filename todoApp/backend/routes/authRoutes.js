```javascript
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { User } = require('../models'); // Import User model

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    if (result.success) {
      res.status(200).json({ success: true, message: 'Registration successful! Please check your email for verification.' });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (result.success) {
      res.status(200).json({ success: true, message: 'Login successful!' });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
```

```javascript
// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
```

```json
// config/database.json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "todoApp",
    "host": "db",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "todoApp_test",
    "host": "db",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "todoApp_production",
    "host": "db",
    "dialect": "mysql"
  }
}
```