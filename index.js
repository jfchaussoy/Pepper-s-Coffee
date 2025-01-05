// Load environment variables from .env
require("dotenv").config();

// Import NPM modules
const express = require("express");

// Create Express app
const app = express();

// Configure assets routes (static folder)
app.use(express.static("public"));

// Favicon static route
app.use("/favicon.ico", express.static("public/images/logo.svg"));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Pepper\'s Coffee!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Pepper's Coffee app started at http://localhost:${port}`);
});
