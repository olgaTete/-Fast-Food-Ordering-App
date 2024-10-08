import React, { useState } from 'react';
import axios from 'axios';

function Register({ onAuthSuccess }) {
  const [fullname, setFullname] = useState('');  // Fullname state
  const [email, setEmail] = useState('');        // Email state (not username)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle registration
  const handleRegister = () => {
    axios.post('/api/Account/register', { fullname, email, password })  // Send email instead of username
      .then(response => {
        localStorage.setItem('token', response.data.token);
        const newUser = { email: response.data.email };  // Use email as identifier
        onAuthSuccess(newUser);
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);  // Show error from backend
        } else {
          setError('Registration failed');
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"     // Email field
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
