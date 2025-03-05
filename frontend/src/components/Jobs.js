import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found—please log in.');
          return;
        }
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: { 'x-auth-token': token }
        });
        setJobs(res.data.jobs || []);
        setError('');
      } catch (err) {
        setError(err.response?.data.msg || 'Failed to fetch jobs');
        console.error('Fetch jobs error:', err.response?.data);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {error && <p>{error}</p>}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id}>
              {job.title} - {job.description} (Posted by user {job.user_id})
            </li>
          ))
        ) : (
          <li>No jobs available</li>
        )}
      </ul>
    </div>
  );
};

export default Jobs;