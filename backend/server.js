require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const username = process.argv[0];
const password = process.argv[1];

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes from app.routes.js
const appRoutes = require('./app.routes');

// Use the imported routes
app.use('/api', appRoutes);

if (!username || !password) {
  console.error('❌ Username and password are required to start the server');
  process.exit(1);
}

const uri = 'mongodb+srv://dankobs:ConquerTasks@taskconquercluster.y48cgte.mongodb.net/task_and_conquer?retryWrites=true&w=majority&appName=TaskConquerCluster';

// Connect to DB before starting server
connectDB(uri).then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
});

// Basic route
app.get('/health', (req, res) => {
  res.send('Server is running');
});
