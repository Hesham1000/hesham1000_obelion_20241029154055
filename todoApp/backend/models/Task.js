```javascript
const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      priority: {
        type: Sequelize.ENUM,
        values: ['Low', 'Medium', 'High'],
        defaultValue: 'Low'
      }
    }, {
      sequelize,
      modelName: 'Tasks',
      timestamps: false
    });
  }
}

Task.init(sequelize);

module.exports = Task;
```