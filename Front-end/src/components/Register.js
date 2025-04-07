import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const [userData, setUserData] = useState({ username: '', password: '', email: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted with:', userData);
    console.log('Method should be POST');
    try {
      const response = await register(userData);
      console.log('Registration Success:', response.data);
      navigate('/profile');
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email (optional)"
        />
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;