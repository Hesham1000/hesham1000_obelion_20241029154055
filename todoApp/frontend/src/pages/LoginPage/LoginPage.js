import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.js.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/register', {
        email,
        password,
      }, {
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

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setMessage('Login successful!');
        // Redirect to dashboard or another page
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
