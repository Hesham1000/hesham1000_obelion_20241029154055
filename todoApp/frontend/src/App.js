import React from 'react';
import Register from './Register';
import Login from './Login';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskEdit from './TaskEdit';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management App</h1>
      </header>
      <main>
        <Register />
        <Login />
        <TaskForm />
        <TaskList />
        <TaskEdit />
      </main>
    </div>
  );
}

export default App;
