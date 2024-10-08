import React, { useState } from 'react';
import axios from 'axios';

function Login({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    axios.post('api/Account/login', { email, password })
      .then(response => {
        // Save the JWT token returned by the server
        localStorage.setItem('token', response.data.token);

        // Create user object from the response
        const loggedInUser = {
          id: response.data.id,          // Ensure this matches your API response
          fullName: response.data.fullName, // Ensure this matches your API response
          email: response.data.email,    // Ensure this matches your API response
        };

        // Call the onAuthSuccess function with the user data
        onAuthSuccess(loggedInUser);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Invalid email or password');
        }
        console.error('Login failed:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
