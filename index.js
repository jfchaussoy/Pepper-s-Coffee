const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/indexRoutes');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use all routes (pages and API)
app.use('/', routes);

// 404 Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
