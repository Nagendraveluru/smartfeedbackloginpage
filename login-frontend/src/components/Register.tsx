import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';
import { toast } from 'react-toastify';
import "../styles/AuthForm.css";         // For Login/Register
import "../styles/Navbar.css";           // For Navbar
import "../styles/Form.css";             // For FeedbackForm/AdminDashboard
import "../styles/History.css";          // For FeedbackHistory


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5072/api/auth/register', {
      username,
      email,
      password,
      confirmPassword
    });

    toast.success("Registration successful! Please login.");
    navigate('/');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Registration failed');
  }
};
  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  required
/>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Register;
