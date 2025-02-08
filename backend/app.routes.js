// routes.js
const express = require('express');
const router = express.Router();

// A simple test route
router.get('/', (req, res) => {
  res.send('Welcome to the Task & Conquer API!');
});

module.exports = router;
