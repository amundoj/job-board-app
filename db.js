// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'amundoj321',  
  database: 'job_board',  
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected!');
  }
});

module.exports = db;
