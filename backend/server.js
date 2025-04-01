const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes from app.routes.js
const appRoutes = require('./app.routes');

// Use the imported routes
app.use(appRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
