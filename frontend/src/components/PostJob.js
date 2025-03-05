import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Job posted: ' + res.data.jobId);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to post job');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostJob;