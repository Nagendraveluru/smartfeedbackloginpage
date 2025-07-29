import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!username || !email) {
    return (
      <div className="home-container">
        <div className="card">
          <h2>Unauthorized Access 🚫</h2>
          <p>Please login to continue.</p>
          <button onClick={() => navigate('/')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    
    <div className="home-container">
      <div className="card">
        <h1>Welcome, {username} 🎉</h1>
        {/* <p><strong>Email:</strong> {email}</p> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </>
  );
};

export default Home;
