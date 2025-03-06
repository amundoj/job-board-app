import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    job_type: '',
    company_name: ''
  });
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
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="text" name="location" placeholder="Location (e.g., Oslo)" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Healthcare">Healthcare</option>
        </select>
        <select name="job_type" onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostJob;