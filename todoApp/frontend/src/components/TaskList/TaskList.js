import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.js.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todoApp-backend.cloud-stacks.com/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post('https://todoApp-backend.cloud-stacks.com/api/tasks', newTask, {
        headers: { 'Content-Type': 'application/json' }
      });
      setNewTask({ title: '', description: '', dueDate: '', priority: 'low' });
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const taskToUpdate = tasks[index];
      await axios.put(`https://todoApp-backend.cloud-stacks.com/api/tasks/${taskToUpdate.id}`, taskToUpdate, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todoApp-backend.cloud-stacks.com/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-creation">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleSave}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleUpdate(index)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
