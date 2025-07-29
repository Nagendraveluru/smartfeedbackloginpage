import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get(`http://localhost:5072/api/feedback/user/${username}`)
      .then(res => setFeedbacks(res.data))
      .catch(() => {});
  }, [username]);

  return (
    <>
      <Navbar />
    
    <div style={{ padding: "2rem" }}>
      <h2>My Feedback History</h2>
      {feedbacks.map((fb: any, idx) => (
        <div key={idx} style={{ marginBottom: "1rem", padding: "1rem", background: "#f2f2f2", borderRadius: "8px" }}>
          <p>{fb.message}</p>
          <small>{new Date(fb.submittedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
    </>
  );
};

export default FeedbackHistory;
