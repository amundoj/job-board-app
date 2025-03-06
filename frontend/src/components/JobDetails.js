import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view job details.');
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/jobs`, {
          headers: { 'x-auth-token': token }
        });
        const jobData = res.data.jobs.find(j => j.id === parseInt(id));
        if (jobData) {
          setJob(jobData);
          setError('');
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError(err.response?.data.msg || 'Failed to fetch job');
      }
    };
    fetchJob();
  }, [id]);

  if (!job && !error) return <p>Loading...</p>;
  if (error) return <p style={{ color: '#e53e3e' }}>{error}</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.job_type}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Posted:</strong> {new Date(job.posted_at).toLocaleDateString('no-NO')}</p>
    </div>
  );
};

export default JobDetails;