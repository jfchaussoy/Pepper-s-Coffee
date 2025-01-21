const express = require('express');
const router = express.Router();

// Import routes
const coffeeRoute = require('./coffeeRoute');
const categoryRoute = require('./categoryRoute');
const customerRoute = require('./customerRoute');
const orderRoute = require('./orderRoute');
const orderItemRoute = require('./orderItemRoute');
const testRoute = require('./testRoute');

// API Status route
router.get('/status', (req, res) => {
  res.json({ 
    status: 'UP',
    version: '1.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
router.use('/coffees', coffeeRoute);
router.use('/categories', categoryRoute);
router.use('/customers', customerRoute);
router.use('/orders', orderRoute);
router.use('/order-items', orderItemRoute);
router.use('/test', testRoute);

module.exports = router;