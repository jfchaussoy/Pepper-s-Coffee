const express = require('express');
const router = express.Router();

// Import various route handlers
const categoryRoute = require('./categoryRoute');
const coffeeRoute = require('./coffeeRoute');
const customerRoute = require('./customerRoute');
const orderRoute = require('./orderRoute');
const orderItemRoute = require('./orderItemRoute');
const testRoute = require('./testRoute'); // Import the test route

// Prefix routes with their respective endpoints
router.use('/api/categories', categoryRoute);
router.use('/api/coffees', coffeeRoute);
router.use('/api/customers', customerRoute);
router.use('/api/orders', orderRoute);
router.use('/api/order-items', orderItemRoute);
router.use('/test', testRoute); // Add the test route

// Export the router for use in other parts of the application
module.exports = router;