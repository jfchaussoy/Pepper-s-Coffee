// Import the configured application
const app = require('./index');

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});