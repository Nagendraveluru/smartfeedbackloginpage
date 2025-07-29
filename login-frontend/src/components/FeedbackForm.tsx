import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
     await axios.post(
  'http://localhost:5072/api/Feedback/submit',
  {
    username: localStorage.getItem("username") || "guest", // Add this
    message: feedback
  },
  {
    headers: {
      Authorization: `Bearer ${token}`, // optional based on your auth
    },
  }
);

      toast.success('✅ Feedback submitted successfully!');
      setFeedback(''); // Clear input

    } catch (error) {
      toast.error('❌ Failed to submit feedback');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default FeedbackForm;
