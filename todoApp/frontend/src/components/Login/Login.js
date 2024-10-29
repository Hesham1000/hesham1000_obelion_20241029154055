import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        setMessage('Login successful!');
        // Redirect to dashboard after login
        // window.location.href = '/dashboard';
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/register', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setMessage('Registration successful! Please check your email for verification.');
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? 'Welcome Back' : 'Login or Register'}</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
