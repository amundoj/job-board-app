import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', location: '', category: '', job_type: '' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view jobs.');
        return;
      }
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { 'x-auth-token': token },
        params: filters
      });
      setJobs(res.data.jobs || []);
      setError('');
    } catch (err) {
      setError(err.response?.data.msg || 'Failed to fetch jobs');
      console.error('Fetch jobs error:', err.response?.data);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Job Listings</h2>
      <div className="filter-section">
        <input
          type="text"
          name="search"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Oslo)"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Healthcare">Healthcare</option>
        </select>
        <select name="job_type" value={filters.job_type} onChange={handleFilterChange}>
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>
      {error && <p style={{ color: '#e53e3e' }}>{error}</p>}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id}>
              <Link to={`/job/${job.id}`} style={{ color: '#4FD1C5', textDecoration: 'none' }}>
                <strong>{job.title}</strong>
              </Link> - {job.company_name} ({job.location})<br />
              <p>{job.description.substring(0, 100)}...</p> {/* Teaser */}
              <small>Type: {job.job_type} | Posted: {new Date(job.posted_at).toLocaleDateString('no-NO')}</small>
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