const express = require('express');
const router = express.Router();

// Define a test route that returns a JSON message
router.get('/', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Export the router for use in other parts of the application
module.exports = router;