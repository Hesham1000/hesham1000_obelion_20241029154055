import React, { useState, useEffect } from 'react';
import './TasksPage.js.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('https://todoApp-backend.cloud-stacks.com/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
    };
    try {
      const response = await fetch('https://todoApp-backend.cloud-stacks.com/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
      resetForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`https://todoApp-backend.cloud-stacks.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTaskData = await response.json();
      setTasks(tasks.map(task => (task.id === taskId ? updatedTaskData : task)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://todoApp-backend.cloud-stacks.com/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('Normal');
  };

  return (
    <div className="tasks-page">
      <div className="task-creation-form">
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleEditTask(task.id, { title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority })}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
