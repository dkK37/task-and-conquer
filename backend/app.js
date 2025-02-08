// app.js
const express = require('express');
const app = express();
const routes = require('./app.routes'); // Import the routes file

app.use('/api', routes); // Use the routes for '/api' endpoints

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
