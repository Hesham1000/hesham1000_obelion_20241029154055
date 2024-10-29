import React, { useState } from 'react';
import axios from 'axios';
import './TaskEdit.js.css';

function TaskEdit({ onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/tasks', {
        title,
        description,
        dueDate,
        priority,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        onSave(response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
        setError(null);
      }
    } catch (err) {
      setError('Error saving task');
    }
  };

  return (
    <div className="task-edit">
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleSave}>Save Task</button>
    </div>
  );
}

export default TaskEdit;
