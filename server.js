const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Simple route
app.get('/', (req, res) => {
    res.send('Job Board API is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
