// Import necessary modules and routes
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./route/indexRoutes');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use all defined routes for handling requests
app.use('/', routes);

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export the configured app
module.exports = app;