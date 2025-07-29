import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../styles/AuthForm.css';
import { toast } from 'react-toastify';
import "../styles/AuthForm.css";         // For Login/Register
import "../styles/Navbar.css";           // For Navbar
import "../styles/Form.css";             // For FeedbackForm/AdminDashboard
import "../styles/History.css";          // For FeedbackHistory


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5072/api/auth/login', {
      username,
      password,
    });

    toast.success(res.data.message);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("email", res.data.email);
    navigate('/home');
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
