import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FeedbackForm from './components/FeedbackForm';
import FeedbackHistory from './pages/FeedbackHistory';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/history" element={<FeedbackHistory />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* ✅ ToastContainer for showing toast messages */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
