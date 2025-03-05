// Simulate a database of jobs
const jobs = [
    { id: 1, title: 'Software Engineer', company: 'ABC Corp', location: 'Remote' },
    { id: 2, title: 'Frontend Developer', company: 'XYZ Ltd', location: 'London' },
  ];
  
  // Controller to get all jobs
  const getJobs = (req, res) => {
    res.json(jobs);
  };
  
  module.exports = { getJobs };
  